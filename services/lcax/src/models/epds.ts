import { date, integer, json, pgTable, primaryKey, text, uuid } from 'drizzle-orm/pg-core'
import type { Conversion, Impacts, Source } from 'lcax'
import { v4 as uuid4 } from 'uuid'
import { Country, Standard, SubType, Unit } from './enums'

export const epds = pgTable(
  'epds',
  {
    id: uuid('id')
      .notNull()
      .$defaultFn(() => uuid4()),
    version: text('version').notNull(),
    name: text('name').notNull(),
    type: text('type').notNull().default('EPD'),
    declaredUnit: Unit().notNull(),
    publishedDate: date('publishedDate').defaultNow().notNull(),
    validUntil: date('validUntil'),
    source: json()
      .$type<Source>()
      .default({} as Source),
    referenceServiceLife: integer(),
    standard: Standard().notNull(),
    comment: text('comment'),
    location: Country().notNull(),
    subtype: SubType().notNull(),
    conversions: json()
      .$type<Conversion[]>()
      .default([] as Conversion[]),
    impacts: json()
      .$type<Impacts>()
      .default({} as Impacts),
    metaData: json().default({}),
  },
  (table) => [primaryKey({ columns: [table.id, table.version] })],
)
