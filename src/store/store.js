
import { configureStore } from '@reduxjs/toolkit';
import authSlice from './authSlice';

const store = configureStore({
    reducer: {
        auth : authSlice,
    }
});

store.subscribe(() => {
    const state = store.getState();
    localStorage.setItem('authState', JSON.stringify(state.auth));
});

export default store;
