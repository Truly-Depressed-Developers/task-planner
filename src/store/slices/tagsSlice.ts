import { createSlice } from "@reduxjs/toolkit"
import { Label } from "../../types/labels"
import { RootState } from "../store"

type TagsState = {
   labels: Label[],
   idCounter: number
}

const initialState: TagsState = {
   labels: [{id:0, name:"Home"}, {id:1, name:"React"}],
   idCounter: 2
}

type TagReducers = MakeReducers<TagsState, {
   addTag: string,
   removeTag: number
   editTag: [id:number, name:string]
}>

export const tagSlice = createSlice<TagsState, TagReducers>({
   name: "counter",
   initialState,
   reducers: {
      addTag: (state, action) => { 
         state.labels = [...state.labels, {
            id:state.idCounter++, 
            name:action.payload 
         }]; 
         return state 
      },
      removeTag: (state, action)=>{state.labels = state.labels.filter(el=> el.id != action.payload); return state},
      editTag: (state, action)=>{
         const label = state.labels.find (el=> el.id == action.payload[0]);
         label.name = action.payload[1];
         state.labels = [...state.labels];
      }
   }
});

export default tagSlice.reducer;

export const { addTag: addLabel} = tagSlice.actions;

export const selectAllLabels = (state: RootState) => state.labels.labels;
export const selectLabel = (labelID: number)=>((state: RootState) => state.labels.labels.find(el=>el.id == labelID));