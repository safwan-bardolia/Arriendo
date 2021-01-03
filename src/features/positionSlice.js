import { createSlice } from "@reduxjs/toolkit";

export const positionSlice = createSlice({
    name: 'position',
    initialState: {
        lat: 21.1702,
        lng: 72.8311
    },
    reducers: {
        // means any time when we want to call this reducer we dispatch setChannelInfo() action
        setPositions: (state, action) => {
            state.lat = action.payload.lat;
            state.lng = action.payload.lng;
        },
        // it is useful when we logged out
        clearPosition: (state) => {
            state.lat = 21.1702;
            state.lng = 72.8311;
        }
    },
})

export const {setPositions, clearPosition} = positionSlice.actions;

export const selectLat = (state) => state.position.lat;
export const selectLng = (state) => state.position.lng;

export default positionSlice.reducer;