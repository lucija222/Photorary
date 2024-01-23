import { configureStore } from "@reduxjs/toolkit";
import photosReducer from "./photosSlice";
import usersReducer from "./usersSlice";

const store = configureStore({
    reducer: {
        photos: photosReducer,
        users: usersReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
