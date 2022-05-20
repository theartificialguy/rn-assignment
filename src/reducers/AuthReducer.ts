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
            state.loading = false;
        },
        login: (state, action) => {
            state.user = action.payload;
            state.loading = false;
        },
        logout: (state) => {
            state.user = null;
            state.loading = false;
        },
        loading: (state, action) => {
            state.loading = action.payload;
        },
    }
});

export const { register, logout, login, loading } = authSlice.actions;
export default authSlice.reducer;