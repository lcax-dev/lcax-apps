import { MantineProvider } from '@mantine/core'
import { render as renderTestingLibrary, type RenderOptions } from '@testing-library/react'
import { createElement, type ReactElement } from 'react'
import '@testing-library/jest-dom/vitest'

if (!window.matchMedia) {
  window.matchMedia = (media: string): MediaQueryList => ({
    matches: false,
    media,
    onchange: null,
    addListener: () => undefined,
    removeListener: () => undefined,
    addEventListener: () => undefined,
    removeEventListener: () => undefined,
    dispatchEvent: () => false,
  })
}

type TestRenderOptions = Omit<RenderOptions, 'wrapper'>

export const render = (ui: ReactElement, options?: TestRenderOptions) =>
  renderTestingLibrary(ui, {
    wrapper: ({ children }) => createElement(MantineProvider, null, children),
    ...options,
  })
