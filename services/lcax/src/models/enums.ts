import { pgEnum } from 'drizzle-orm/pg-core'
import { units, subTypes, standards, countries } from 'lcax'

export const Unit = pgEnum('unit', units() as [string, ...string[]])
export const SubType = pgEnum('subtype', subTypes() as [string, ...string[]])
export const Standard = pgEnum('standard', standards() as [string, ...string[]])
export const Country = pgEnum('country', countries() as [string, ...string[]])
