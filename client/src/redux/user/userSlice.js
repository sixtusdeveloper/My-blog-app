import { createSlice } from '@reduxjs/toolkit'; // Import createSlice from @reduxjs/toolkit
import { sign } from 'jsonwebtoken';

const initialState = {  // Define the initial state
    currentUser: null,
    error: null,    
    loading: false,
};  

const userSlice = createSlice({  // Create a slice  


    name: 'user',  // Name the slice

    initialState,  // Pass the initial
    // Define the reducers
    reducers: {
        signInStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        signInSuccess: (state, action) => {
            state.loading = false;
            state.currentUser = action.payload;
            state.error = null;
        },
        signInFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});


export const { signInStart, signInSuccess, signInFailure } = userSlice.actions;  // Export the actions

export default userSlice.reducer;  // Export the reducer    