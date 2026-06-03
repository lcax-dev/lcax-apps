import { epds } from '@/models/epds'
import { assemblies } from '@/models/assemblies'
import { products } from '@/models/products'

export type EPD = typeof epds.$inferSelect
export type Assembly = typeof assemblies.$inferSelect
export type Product = typeof products.$inferSelect
