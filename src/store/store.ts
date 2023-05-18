import {configureStore, ThunkDispatch, AnyAction} from "@reduxjs/toolkit";
import {useDispatch} from "react-redux";
import questionSlice from "./features/questionSlice";
// import promptSlice from "./features/promptSlice";

export const store = configureStore({
    reducer: {
        questions: questionSlice,
        // prompt: promptSlice,
    },
});

//type StoreType = typeof store;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
//export type AppDispatchType = typeof store.dispatch
export type AppDispatchType = typeof store.dispatch
export const useAppDispatch = () => useDispatch<ThunkDispatch<RootState, unknown, AnyAction>>()
