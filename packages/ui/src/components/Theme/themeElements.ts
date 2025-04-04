import { MantineColorsTuple, rem } from '@mantine/core'
import '@fontsource/inter-tight/400.css'
import '@fontsource/inter-tight/500.css'
import '@fontsource/inter-tight/600.css'
import '@fontsource/inter-tight/700.css'

export const fontFamily = 'Inter Tight, sans-serif'

export const headings = {
  fontFamily,
  fontWeight: '700',
}
export const fontSizes = {
  xs: rem(12),
  sm: rem(14),
  md: rem(16),
  lg: rem(18),
  xl: rem(20),
}

export const breakpoints = {
  xs: '36em',
  sm: '48em',
  md: '62em',
  lg: '75em',
  xl: '88em',
  xxl: '110em',
}
export const black = '#2e2e2e'
export const primaryColor = 'blue'
export const primaryShade = 7
export const colors = {
  light: [
    '#fbf3f5',
    '#e8e8e8',
    '#cdcdcd',
    '#b2b2b2',
    '#9a9a9a',
    '#8b8b8b',
    '#848484',
    '#717171',
    '#656565',
    '#2e2e2e',
  ] as MantineColorsTuple,
  blue: [
    '#eef1ff',
    '#dbdff6',
    '#b6bce5',
    '#8d98d6',
    '#6b78c8',
    '#5564c1',
    '#4a5abe',
    '#3b4ba8',
    '#334397',
    '#283886',
  ] as MantineColorsTuple,
  green: [
    '#eafcef',
    '#daf4e3',
    '#b6e5c6',
    '#8ed7a8',
    '#6dca8d',
    '#58c37c',
    '#4bbf74',
    '#3ba861',
    '#319555',
    '#208146',
  ] as MantineColorsTuple,
  red: [
    '#ffedf0',
    '#f6dbdf',
    '#e5b6bc',
    '#d68e98',
    '#c86b79',
    '#c15665',
    '#be4a5a',
    '#a83b4b',
    '#973342',
    '#852837',
  ] as MantineColorsTuple,
  yellow: [
    '#fcf8e8',
    '#f4efd9',
    '#e5deb6',
    '#d7cc8e',
    '#cabc6d',
    '#c3b357',
    '#bfae4b',
    '#a8983b',
    '#958732',
    '#807424',
  ] as MantineColorsTuple,
}
