import { doublePrecision, json, pgTable, text, uuid } from 'drizzle-orm/pg-core'
import type { Classification, Impacts, MetaData, ProductReference } from 'lcax'
import { v4 as uuid4 } from 'uuid'
import { Unit } from './enums'

export const assemblies = pgTable('assemblies', {
  id: uuid('id')
    .primaryKey()
    .notNull()
    .$defaultFn(() => uuid4()),
  name: text('name').notNull(),
  description: text('description'),
  comment: text('comment'),
  quantity: doublePrecision('quantity').notNull(),
  unit: Unit().notNull(),
  classification: json('classification').$type<Classification[]>().default([]),
  products: json('products').$type<ProductReference[]>().notNull().default([]),
  results: json('results').$type<Impacts>(),
  metaData: json('metaData').$type<MetaData>().default({}),
})
