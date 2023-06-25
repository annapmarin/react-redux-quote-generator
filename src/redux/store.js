import { configureStore } from "@reduxjs/toolkit";
import quoteReducer from './reducers/quoteReducer'

export const store = configureStore({
    reducer: {
        quote: quoteReducer,
    }
});

