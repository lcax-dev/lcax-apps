import { and, eq, inArray } from 'drizzle-orm'
import { GraphQLError } from 'graphql'
import type { Classification, ImpactData, ProductReference } from 'lcax'
import { v4 as uuid4 } from 'uuid'
import { dbConnection } from '@/config/database'
import * as models from '@/models'
import type { Assembly, Product } from '@/models/types'
import type { GraphQLContext } from '@/schema/context'
import { hydrateOrganizationAssemblies } from '@/schema/resolvers/getOrganizationAssemblies'
import { UUID_RE, productIdsFromRefs, requireOrganizationSession } from '@/schema/utils/organizationAssembly'

type ImpactRefInput = { id?: string | null; version?: string | null }
type ProductWriteInput = {
  id?: string | null
  name?: string | null
  description?: string | null
  quantity?: number | null
  unit?: string | null
  referenceServiceLife?: number | null
  classification?: Classification[] | null
  impactData?: ImpactRefInput[] | null
}
type AssemblyWriteInput = {
  name?: string | null
  description?: string | null
  comment?: string | null
  quantity?: number | null
  unit?: string | null
  classification?: unknown
  products?: ProductWriteInput[] | null
}

const notFound = () =>
  new GraphQLError('Assembly not found', {
    extensions: {
      code: 'NOT_FOUND',
      http: { status: 404 },
    },
  })

const badInput = (message: string) =>
  new GraphQLError(message, {
    extensions: {
      code: 'BAD_USER_INPUT',
    },
  })

const dedupeImpactRefs = (refs: ImpactRefInput[] | null | undefined): { id: string; version: string }[] => {
  const seen = new Set<string>()
  const unique: { id: string; version: string }[] = []
  for (const ref of refs ?? []) {
    if (!ref?.id || !ref?.version) continue
    const key = `${ref.id}:${ref.version}`
    if (seen.has(key)) continue
    seen.add(key)
    unique.push({ id: ref.id, version: ref.version })
  }
  return unique
}

const toEpdImpactData = (refs: { id: string; version: string }[]): ImpactData[] =>
  refs.map((ref) => ({
    type: 'reference',
    uri: ref.id,
    format: 'lcax',
    version: ref.version,
  })) as ImpactData[]

const toProductRefs = (productIds: string[]): ProductReference[] =>
  productIds.map((productId) => ({
    type: 'reference',
    uri: productId,
    format: 'lcax',
    version: null,
  })) as ProductReference[]

const isVisibleEpd = (
  epd: { visibility?: string | null; organizationId?: string | null } | undefined,
  organizationId: string,
) => Boolean(epd && (epd.visibility === 'Public' || epd.organizationId === organizationId))

const reconcileProducts = async ({
  existing,
  products,
  organizationId,
  kind,
  assemblyVisibility,
}: {
  existing: Assembly | null
  products: { input: ProductWriteInput; impactData: { id: string; version: string }[] }[]
  organizationId: string
  kind: 'DRAFT' | 'COMPLETE'
  assemblyVisibility: 'Public' | 'Private'
}): Promise<Product[]> => {
  const existingIds = productIdsFromRefs(existing?.products)
  const ownedRows =
    existingIds.length > 0
      ? await dbConnection
          .select()
          .from(models.products)
          .where(and(inArray(models.products.id, existingIds), eq(models.products.organizationId, organizationId)))
      : []
  const owned = new Map(ownedRows.map((row) => [row.id, row]))

  const incomingIds = products
    .map((product) => product.input.id)
    .filter((id): id is string => Boolean(id) && UUID_RE.test(id))
  const existingByIncomingId =
    incomingIds.length > 0
      ? await dbConnection
          .select({ id: models.products.id })
          .from(models.products)
          .where(inArray(models.products.id, incomingIds))
      : []
  const takenIds = new Set(existingByIncomingId.map((row) => row.id))

  const keptIds = new Set<string>()
  const saved: Product[] = []

  for (const product of products) {
    const impactData = toEpdImpactData(product.impactData)
    const ownedRow = product.input.id ? owned.get(product.input.id) : undefined

    if (ownedRow) {
      const visibility = kind === 'COMPLETE' && assemblyVisibility === 'Public' ? 'Public' : ownedRow.visibility
      const [updated] = await dbConnection
        .update(models.products)
        .set({
          name: product.input.name ?? ownedRow.name,
          description: product.input.description ?? null,
          quantity: product.input.quantity ?? ownedRow.quantity,
          unit: product.input.unit ?? ownedRow.unit,
          referenceServiceLife: product.input.referenceServiceLife ?? ownedRow.referenceServiceLife,
          classification: product.input.classification ?? ownedRow.classification ?? [],
          impactData,
          visibility,
        })
        .where(and(eq(models.products.id, ownedRow.id), eq(models.products.organizationId, organizationId)))
        .returning()
      keptIds.add(ownedRow.id)
      saved.push(updated)
      continue
    }

    const requestedId = product.input.id && UUID_RE.test(product.input.id) ? product.input.id : undefined
    const id = requestedId && !takenIds.has(requestedId) ? requestedId : uuid4()
    takenIds.add(id)
    const visibility = assemblyVisibility === 'Public' ? 'Public' : 'Private'
    const [inserted] = await dbConnection
      .insert(models.products)
      .values({
        id,
        name: product.input.name ?? '',
        description: product.input.description ?? null,
        quantity: product.input.quantity ?? 1,
        unit: product.input.unit ?? 'pcs',
        referenceServiceLife: product.input.referenceServiceLife ?? 0,
        classification: product.input.classification ?? [],
        impactData,
        organizationId,
        visibility,
      })
      .returning()
    keptIds.add(inserted.id)
    saved.push(inserted)
  }

  const toDelete = existingIds.filter((id) => owned.has(id) && !keptIds.has(id))
  if (toDelete.length > 0) {
    await dbConnection
      .delete(models.products)
      .where(and(inArray(models.products.id, toDelete), eq(models.products.organizationId, organizationId)))
  }

  return saved
}

export const saveOrganizationAssemblyResolver = async (_source, args, context: GraphQLContext) => {
  const organizationId = requireOrganizationSession(context)
  const { input } = args
  const kind = input.kind as 'DRAFT' | 'COMPLETE'
  const assembly = (input.assembly ?? {}) as AssemblyWriteInput
  const name = assembly.name?.trim()
  if (!name) {
    throw badInput('Assembly name is required')
  }

  let existing: Assembly | null = null
  if (input.id) {
    if (!UUID_RE.test(input.id)) throw notFound()
    const rows = await dbConnection
      .select()
      .from(models.assemblies)
      .where(and(eq(models.assemblies.id, input.id), eq(models.assemblies.organizationId, organizationId)))
    existing = rows[0] ?? null
    if (!existing) throw notFound()
  }

  if (kind === 'DRAFT' && existing?.visibility === 'Public' && input.confirmPrivatize !== true) {
    throw new GraphQLError('Saving a draft will make this Public Assembly Private', {
      extensions: {
        code: 'CONFIRM_PRIVATIZE',
      },
    })
  }

  const products = (assembly.products ?? []).map((product) => ({
    input: product,
    impactData: dedupeImpactRefs(product.impactData),
  }))

  let visibility: 'Public' | 'Private' = 'Private'
  let incomplete = true
  let results = null

  if (kind === 'COMPLETE') {
    if (input.visibility !== 'Public' && input.visibility !== 'Private') {
      throw badInput('Complete save requires visibility Public or Private')
    }
    visibility = input.visibility
    incomplete = false
    results = input.results ?? null

    if (products.length === 0) {
      throw badInput('Complete save requires at least one Product')
    }
    if (products.some((product) => product.impactData.length === 0)) {
      throw badInput('Each Product must have at least one EPD')
    }

    const epdIds = [...new Set(products.flatMap((product) => product.impactData.map((ref) => ref.id)))]
    const epdRows = await dbConnection.select().from(models.epds).where(inArray(models.epds.id, epdIds))
    const epdsByKey = new Map(epdRows.map((epd) => [`${epd.id}:${epd.version}`, epd]))

    const privateEpds: { id: string; name: string; version: string }[] = []
    const seenPrivate = new Set<string>()
    for (const product of products) {
      for (const ref of product.impactData) {
        const epd = epdsByKey.get(`${ref.id}:${ref.version}`)
        if (!isVisibleEpd(epd, organizationId)) {
          throw badInput('Complete save requires all EPD references to resolve')
        }
        if (epd?.visibility === 'Private') {
          const key = `${epd.id}:${epd.version}`
          if (!seenPrivate.has(key)) {
            seenPrivate.add(key)
            privateEpds.push({ id: epd.id, name: epd.name, version: epd.version })
          }
        }
      }
    }

    if (visibility === 'Public' && privateEpds.length > 0 && input.confirmForcePublish !== true) {
      throw new GraphQLError('Publishing this Assembly will make Private EPDs Public', {
        extensions: {
          code: 'CONFIRM_FORCE_PUBLISH',
          epds: privateEpds.map(({ id, name }) => ({ id, name })),
        },
      })
    }

    if (visibility === 'Public' && input.confirmForcePublish === true) {
      for (const epd of privateEpds) {
        await dbConnection
          .update(models.epds)
          .set({ visibility: 'Public' })
          .where(
            and(
              eq(models.epds.id, epd.id),
              eq(models.epds.version, epd.version),
              eq(models.epds.organizationId, organizationId),
            ),
          )
      }
    }
  } else {
    visibility = 'Private'
    incomplete = true
    results = null
  }

  if (visibility === 'Public' && incomplete) {
    throw badInput('Public assemblies cannot be incomplete')
  }

  const savedProducts = await reconcileProducts({
    existing,
    products,
    organizationId,
    kind,
    assemblyVisibility: visibility,
  })

  const assemblyRow = {
    name,
    description: assembly.description ?? null,
    comment: assembly.comment ?? null,
    quantity: assembly.quantity ?? 1,
    unit: assembly.unit ?? 'pcs',
    classification: (assembly.classification as Assembly['classification']) ?? [],
    products: toProductRefs(savedProducts.map((product) => product.id)),
    results,
    organizationId,
    visibility,
    incomplete,
  }

  const savedId = existing?.id ?? uuid4()
  if (existing) {
    await dbConnection.update(models.assemblies).set(assemblyRow).where(eq(models.assemblies.id, existing.id))
  } else {
    await dbConnection.insert(models.assemblies).values({ id: savedId, ...assemblyRow })
  }

  const [saved] = await dbConnection
    .select()
    .from(models.assemblies)
    .where(and(eq(models.assemblies.id, savedId), eq(models.assemblies.organizationId, organizationId)))
  const [hydrated] = await hydrateOrganizationAssemblies([saved], organizationId)
  return hydrated
}
