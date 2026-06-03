import { doublePrecision, json, pgTable, text, uuid } from 'drizzle-orm/pg-core'
import type { ImpactData, Impacts, MetaData, Transport } from 'lcax'
import { v4 as uuid4 } from 'uuid'
import { Unit } from './enums'

export const products = pgTable('products', {
  id: uuid('id')
    .primaryKey()
    .notNull()
    .$defaultFn(() => uuid4()),
  name: text('name').notNull(),
  description: text('description'),
  referenceServiceLife: doublePrecision('referenceServiceLife').notNull(),
  impactData: json('impactData').$type<ImpactData[]>().notNull().default([]),
  quantity: doublePrecision('quantity').notNull(),
  unit: Unit().notNull(),
  transport: json('transport').$type<Transport[]>().default([]),
  results: json('results').$type<Impacts>(),
  metaData: json('metaData').$type<MetaData>().default({}),
})
