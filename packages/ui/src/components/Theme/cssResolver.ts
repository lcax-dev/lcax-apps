import { CSSVariablesResolver } from '@mantine/core'

export const resolver: CSSVariablesResolver = (theme) => ({
  variables: {
    '--mantine-breakpoint-xxl': theme.breakpoints.xxl,
  },
  light: {},
  dark: {},
})
