// features/authSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { action, actionSlicis } from "./types/visible";


const initialState: actionSlicis = {
    Action: [],
};

const actionSlice = createSlice({
    name: 'action',
    initialState,
    reducers: {
        addAction(state, action: PayloadAction<action>) {
            state.Action.push(action.payload)
        },
        removeAction(state, action: PayloadAction<number>) {
            state.Action = state.Action.filter(val => val.id !== action.payload);
        }
    }
});

export const {
    addAction,
    removeAction
} = actionSlice.actions;

export default actionSlice.reducer;
