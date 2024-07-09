import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';
import { tokenExpirationMiddleware } from './reducers/authSlice';

const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(tokenExpirationMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
