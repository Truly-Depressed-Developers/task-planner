import { createSlice } from "@reduxjs/toolkit"
import { RootState } from "../store"

type CounterState = {
    tasks: Task[]
}

const initialState: CounterState = {
    tasks: []
}

type CounterReducers = MakeReducers<CounterState, {
    setTaskCompletion: {id: number, value: boolean},
    addTask: Task,
    deleteAllTasks: undefined,
}>

export const counterSlice = createSlice<CounterState, CounterReducers>({
    name: "tasks",
    initialState,
    reducers: {
        setTaskCompletion: (state, action) => { 
            state.tasks.find(el => el.id == action.payload.id).completed = action.payload.value; 
            console.log("Task", action.payload.id, "set to", action.payload.value); 
            return state 
        },
        addTask: (state, action) => { 
            state.tasks.push(action.payload); 
            console.log("Added task. Tasks:", state.tasks);
            return state 
        },
        deleteAllTasks: (state, action) => { 
            state.tasks = []
            console.log("Deleted all tasks");
            return state 
        },
        
    }
});

export default counterSlice.reducer;

export const { setTaskCompletion, addTask, deleteAllTasks } = counterSlice.actions;

export const selectTasks = (state: RootState) => state.tasks.tasks;