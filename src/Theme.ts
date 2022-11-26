import { DefaultTheme } from "react-native-paper/"
import { white, black, pinkA100 } from "react-native-paper/src/styles/colors"
import configureFonts from "react-native-paper/src/styles/fonts"
import color from "color"

const primary = '#86BCFC';
const accent = '#BB86FC';
const background = '#121212';
const surface = '#121212';
const error = '#CF6679';
const onSurface = '#FFFFFF';

const theme: Readonly<ReactNativePaper.Theme> = {
    dark: true,
    roundness: 4,
    colors: {
        primary: primary,
        accent: accent,
        background: background,
        surface: surface,
        error: error,
        onSurface: onSurface,
        text: white,
        disabled: color(white).alpha(0.38).rgb().string(),
        placeholder: color(white).alpha(0.54).rgb().string(),
        backdrop: color(black).alpha(0.5).rgb().string(),
        notification: pinkA100,
    },
    elevation: {
        dp00: color(surface).mix(color(white), 0).rgb().toString(),
        dp01: color(surface).mix(color(white), 0.05).rgb().toString(),
        dp02: color(surface).mix(color(white), 0.07).rgb().toString(),
        dp03: color(surface).mix(color(white), 0.08).rgb().toString(),
        dp04: color(surface).mix(color(white), 0.09).rgb().toString(),
        dp06: color(surface).mix(color(white), 0.11).rgb().toString(),
        dp08: color(surface).mix(color(white), 0.12).rgb().toString(),
        dp12: color(surface).mix(color(white), 0.14).rgb().toString(),
        dp16: color(surface).mix(color(white), 0.15).rgb().toString(),
        dp24: color(surface).mix(color(white), 0.16).rgb().toString()
    },
    fonts: configureFonts(),
    mode: "adaptive",
    animation: {
        scale: 1.0,
    },
}

// import { DefaultTheme as theme } from "react-native-paper"

export default { ...theme, ...DefaultTheme };