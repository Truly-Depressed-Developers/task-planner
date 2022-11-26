import { CaseReducer, PayloadAction } from "@reduxjs/toolkit"

declare global {
    interface String {
        toTitleCase: () => string
    }

    namespace ReactNativePaper {
        interface ThemeElevation {
            dp00: string,
            dp01: string,
            dp02: string,
            dp03: string,
            dp04: string,
            dp06: string,
            dp08: string,
            dp12: string,
            dp16: string,
            dp24: string
        }

        interface Theme {
            elevation: ThemeElevation
        }

        type WithTheme<T extends Object> = T & { theme: Theme }
    }

    export type WithTheme<T extends object> = ReactNativePaper.WithTheme<T>

    export type MakeReducers<S extends {}, R> = {
        [x in keyof R]: CaseReducer<S, PayloadAction<R[x]>>
    }
}