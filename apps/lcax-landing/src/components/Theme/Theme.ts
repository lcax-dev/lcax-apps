import { createTheme, mergeMantineTheme } from '@mantine/core'
import { uiTheme } from '@lcax/ui'

const themeOverride = createTheme({
  defaultRadius: 'xl',
  colors: {
    yellow: [
      '#fff9e2',
      '#fbf2cf',
      '#f4e3a4',
      '#eed474',
      '#e8c547',
      '#e5be32',
      '#e4ba22',
      '#caa312',
      '#b49107',
      '#9b7d00',
    ],
    grey: [
      '#f5f5f5',
      '#e7e7e7',
      '#cdcdcd',
      '#b2b2b2',
      '#9a9a9a',
      '#8b8b8b',
      '#848484',
      '#717171',
      '#656565',
      '#575757',
    ],
  },
  primaryShade: 4,
  primaryColor: 'yellow',
  black: '#000',
  white: '#fff',
})

export const theme = mergeMantineTheme(uiTheme, themeOverride)
