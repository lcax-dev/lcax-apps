import { pgEnum } from 'drizzle-orm/pg-core'
import enums from './enumData'

export const Unit = pgEnum('unit', enums.units as [string, ...string[]])
export const SubType = pgEnum('subtype', enums.subTypes as [string, ...string[]])
export const Standard = pgEnum('standard', enums.standards as [string, ...string[]])
export const Country = pgEnum('country', enums.countries as [string, ...string[]])
