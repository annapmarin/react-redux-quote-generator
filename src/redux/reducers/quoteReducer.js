import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchQuotes = createAsyncThunk('fetchQuotes', async() => {
    const response = await fetch('https://api.quotable.io/quotes/random');
    return response.json();
});

const quoteSlice = createSlice({
    name: 'quote',
    initialState: {
        isLoading: false,
        isError: false,
        data: null
    },
    extraReducers: (builder) => {
        builder.addCase(fetchQuotes.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(fetchQuotes.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
        });
        builder.addCase(fetchQuotes.rejected, (state, action) => {
            console.log('Error', action.payload);
            state.isError = true;
        })
    },
});

export default quoteSlice.reducer;