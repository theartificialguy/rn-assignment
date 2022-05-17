import { configureStore } from '@reduxjs/toolkit';
import { AuthReducer, RealmReducer } from './src/reducers';

export const store = configureStore({
    reducer: {
        auth: AuthReducer,
        realm: RealmReducer,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});
