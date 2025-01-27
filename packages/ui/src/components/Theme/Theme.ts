import { createTheme, MantineTheme } from '@mantine/core'
import {
  black,
  breakpoints,
  colors,
  fontFamily,
  fontSizes,
  headings,
  primaryColor,
  primaryShade,
} from './themeElements'
import '@fontsource/rubik'

export const uiTheme = createTheme({
  fontFamily,
  headings,
  fontSizes,
  breakpoints,
  black,
  primaryColor,
  primaryShade,
  colors,
}) as MantineTheme
