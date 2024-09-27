import { createSlice } from '@reduxjs/toolkit'; // Import createSlice from @reduxjs/toolkit
import { sign } from 'jsonwebtoken';
import { deleteUser } from '../../../../api/controllers/user.controller';

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
        updateStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        updateSuccess: (state, action) => {
            state.loading = false;
            state.currentUser = action.payload;
            state.error = null;
        },  
        updateFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        deleteUserStart: (state) => {
            state.loading = true;
            state.error = null;
        },  
        deleteUserSuccess: (state) => {
            state.loading = false;
            state.currentUser = null;
            state.error = null;
        },  
        deleteUserFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        signoutSuccess: (state) => {
            state.currentUser = null;
            state.loading = false;
            state.error = null;
        }
    },
});


export const { signInStart, signInSuccess, signInFailure, updateStart, updateSuccess, updateFailure, deleteUserStart, deleteUserSuccess, deleteUserFailure, signoutSuccess } = userSlice.actions;  // Export the actions

export default userSlice.reducer;  // Export the reducer    