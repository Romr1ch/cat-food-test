import 'styled-components'

declare module 'styled-components' {
  export interface DefaultTheme {
    primary: {
      main: string
      light: string
    }
    secondary: {
      main: string
      light: string
    }
    text: {
      primary: string
      secondary: string
      disabled: string
    }
    bg: {
      primary: string
    }
    yellow: {
      main: string
    }
    white: {
      main: string
    }
  }
}
