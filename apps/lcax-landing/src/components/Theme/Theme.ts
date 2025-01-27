import { createTheme, mergeMantineTheme } from '@mantine/core'
import { uiTheme } from '@lcax/ui'

const themeOverride = createTheme({
  defaultRadius: 0,
});

export const theme = mergeMantineTheme(uiTheme, themeOverride);