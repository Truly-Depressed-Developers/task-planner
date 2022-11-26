import { createSlice } from "@reduxjs/toolkit"
import { RootState } from "../store"

type CounterState = {
    value: number
}

const initialState: CounterState = {
    value: 0
}

type CounterReducers = MakeReducers<CounterState, {
    increment: undefined,
    decrement: undefined,
    incrementByAmount: number
}>

export const counterSlice = createSlice<CounterState, CounterReducers>({
    name: "counter",
    initialState,
    reducers: {
        increment: (state, action) => { state.value += 1; return state },
        decrement: (state, action) => { state.value -= 1; return state },
        incrementByAmount: (state, action) => { state.value += action.payload; return state }
    }
});

export default counterSlice.reducer;

export const { increment, decrement, incrementByAmount } = counterSlice.actions;

export const selectCount = (state: RootState) => state.counter.value;