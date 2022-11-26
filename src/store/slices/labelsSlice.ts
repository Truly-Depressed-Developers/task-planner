import { createSlice } from "@reduxjs/toolkit"
import { Label } from "../../types/labels"
import { RootState } from "../store"

type LabelState = {
   labels: Label[],
   idCounter: number
}

const initialState: LabelState = {
   labels: [{id:0, name:"Home"}, {id:1, name:"React"}],
   idCounter: 2
}

type LabelReducers = MakeReducers<LabelState, {
   addLabel: string,
   removeLabel: number
   editLabel: [id:number, name:string]
}>

export const labelSlice = createSlice<LabelState, LabelReducers>({
   name: "counter",
   initialState,
   reducers: {
      addLabel: (state, action) => { 
         state.labels = [...state.labels, {
            id:state.idCounter++, 
            name:action.payload 
         }]; 
         return state 
      },
      removeLabel: (state, action)=>{state.labels = state.labels.filter(el=> el.id != action.payload); return state},
      editLabel: (state, action)=>{
         const label = state.labels.find (el=> el.id == action.payload[0]);
         label.name = action.payload[1];
         state.labels = [...state.labels];
      }
   }
});

export default labelSlice.reducer;

export const { addLabel} = labelSlice.actions;

export const selectAllLabels = (state: RootState) => state.labels.labels;
export const selectLabel = (labelID: number)=>((state: RootState) => state.labels.labels.find(el=>el.id == labelID));