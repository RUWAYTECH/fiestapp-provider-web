import { configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'
import { middleware as apiSliceMiddleware } from './apiSlices/apiSlice'
import reducer from './slices/index'

const sagaMiddleware = createSagaMiddleware()
const store = configureStore({
    reducer,
    middleware: getDefaultMiddleware => [
        ...getDefaultMiddleware({
            serializableCheck: false,
        }),
        sagaMiddleware,
        apiSliceMiddleware
    ],
})

// Middleware: Redux Saga


// Exports
export default store;
