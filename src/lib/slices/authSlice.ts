import { createSlice } from "@reduxjs/toolkit";
const authSlice = createSlice({
    name:"auth",
    initialState:{isSignedIn:false},
    reducers:{
        signIn(state){
            state.isSignedIn = true
        },
        logOut(state){
            state.isSignedIn = false
        },

    }
})

export const authActions = authSlice.actions
export default authSlice