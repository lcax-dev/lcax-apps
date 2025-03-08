export const breakdownOptions = ['Total', 'Building Components', 'Life Cycle'] as const
export type BreakdownOptions = (typeof breakdownOptions)[number]

export interface TooltipPayload {
  name: string
  value: number
  color: string
  payload: {
    id: string
  } | null
}
