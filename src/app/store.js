import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/userSlice'
import positionReducer from '../features/positionSlice'
import hostingFormReducer from '../features/hostingFormSlice'

export default configureStore({
  reducer: {
    user: userReducer,
    position: positionReducer,
    hostingForm: hostingFormReducer
  },
});
