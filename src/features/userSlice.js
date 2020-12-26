import {createSlice} from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: null
    },

    // reducer is like each department (it has it's own set of data)
    reducers: {

        // means any time when we want to call this reducer we dispatch the login action i.e dispatch(login({payload property}))
        login: (state, action) => {
            state.user = action.payload;
        },

        // means any time when we want to call this reducer we dispatch the logout action i.e dispatch(logout()) because here payload is not req
        logout: (state) => {
            state.user = null;
        }
    }
})

export const {login, logout} = userSlice.actions;           // means any we want to call this reducer we dispatch its corresponding action
export const selectUser = (state) => state.user.user;       // to get the data from particular slice
export default userSlice.reducer;