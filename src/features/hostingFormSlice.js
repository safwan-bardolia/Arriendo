import {createSlice} from '@reduxjs/toolkit';

export const hostingFormSlice = createSlice({
    name: 'hostingForm',
    initialState: {
        hostingForm: null
    },

    reducers: {
        setHostingFormData: (state, action) => {
            state.hostingForm = action.payload;
        },

        clearHostingFormData: (state) => {
            state.hostingForm = null;
        }
    }
})

export const {setHostingFormData, clearHostingFormData} = hostingFormSlice.actions;
export const selectHostingFormData = (state) => state.hostingForm.hostingForm;
export default hostingFormSlice.reducer;