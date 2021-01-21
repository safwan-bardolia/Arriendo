import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/userSlice'
import positionReducer from '../features/positionSlice'

export default configureStore({
  reducer: {
    user: userReducer,
    position: positionReducer
  },
});
