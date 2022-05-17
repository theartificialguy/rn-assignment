import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    records: [],
}

export const realmSlice = createSlice({
    name: 'realm',
    initialState,
    reducers: {
        setRecords: (state, action) => {
            state.records = action.payload;
        }
    }
});

export const { setRecords } = realmSlice.actions;
export default realmSlice.reducer;