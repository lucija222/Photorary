import { configureStore } from "@reduxjs/toolkit";
import photosReducer from "./photosSlice";
import usersReducer from "./usersSlice";
import loaderReducer from "./loaderSlice";
import urlReducer from "./urlSlice";

const store = configureStore({
    reducer: {
        photos: photosReducer,
        users: usersReducer,
        loader: loaderReducer,
        url: urlReducer
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
