import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentUser: null,
  error: null,
  loading: false,
};

const userSlice  =  createSlice({
    name: 'user',
    initialState,
    reducers: {
        loginStart : (state) =>{
            state.loading = true;
            state.error = null;
        },
        signInSuccess: (state, action) => {  
            state.currentUser = action.payload;
            state.loading = false;
            state.error = null;
          },
        signInFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
           logout: (state) => {
            state.currentUser = null;
            state.error = null;
            state.loading = false;
          },
    }
});

export const { loginStart, signInSuccess, signInFailure, logout } = userSlice.actions;
export default userSlice.reducer;
