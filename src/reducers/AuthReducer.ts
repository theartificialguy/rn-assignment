import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    loading: true,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        register: (state, action) => {
            state.user = action.payload;
        },
        login: (state, action) => {
            state.user = action.payload;
        },
        logout: (state) => {
            state.user = null;
        },
        loading: (state, action) => {
            state.loading = action.payload;
        },
    }
});

export const { register, logout, login, loading } = authSlice.actions;
export default authSlice.reducer;