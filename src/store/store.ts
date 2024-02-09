import { configureStore } from "@reduxjs/toolkit";
import photosReducer from "./photosSlice";
import usersReducer from "./usersSlice";
import loaderReducer from "./loaderSlice";

const store = configureStore({
    reducer: {
        photos: photosReducer,
        users: usersReducer,
        loader: loaderReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
