import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { mainAPI } from "../../api/api";


export type getAnswerThunkBodyType = {
    n: number
}
export const getAnswerThunk = createAsyncThunk(
    'auth/profileThunk',
    async (_, {rejectWithValue, dispatch}) => {
        try {
            // const res = await mainAPI.getAnswer({n: 1});
            // return res.data.data
        } catch (err: any) {
            // toast(err.response.data.message);
        }
    }
);
