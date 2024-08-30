import { configureStore } from '@reduxjs/toolkit';
import { thunk } from 'redux-thunk';
import authReducer from './reducers/authReducer';

const loggerMiddleware = (storeAPI) => (next) => (action) => {
    console.log('Dispatching:', action);
    let result = next(action);
    console.log('Next state:', storeAPI.getState());
    return result;
};

const store = configureStore({
    reducer: {
        auth: authReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(thunk, loggerMiddleware),
});

export default store;