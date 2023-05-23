import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { questionsAPI } from "../../api/api";
import { QuestionType } from "./questionSlice";
import { USER_NAME_LocalStorage } from "../../functions/consts";


export const getQuestionsThunk = createAsyncThunk(
    'questions/getQuestionsThunk',
    async (_, {rejectWithValue, dispatch}) => {
        try {
            const res = await questionsAPI.getQuestions();
            return res.data.data
        } catch (err: any) {
            toast(err.response.data.message);
        }
    }
);

export const putQuestionsThunk = createAsyncThunk(
    'questions/putQuestionsThunk',
    async (data: Array<QuestionType>, {rejectWithValue, dispatch}) => {
        try {
            const res = await questionsAPI.putQuestions(data);
            return res.data.data
        } catch (err: any) {
            toast(err.response.data.message);
        }
    }
);


export const getPromtThunk = createAsyncThunk(
    'questions/getPromtThunk',
    async (_, {rejectWithValue, dispatch}) => {
        try {
            const res = await questionsAPI.getPrompt();
            return res.data.data
        } catch (err: any) {
            toast(err.response.data.message);
        }
    }
);

export const putPromptThunk = createAsyncThunk(
    'questions/putPromptThunk',
    async (data: Array<string>, {rejectWithValue, dispatch}) => {
        try {
            const res = await questionsAPI.putPrompt(data);
            return res.data.data
        } catch (err: any) {
            toast(err.response.data.message);
        }
    }
);

export const postResponseThunk = createAsyncThunk(
    'questions/postResponseThunk',
    async (prompt: Array<string>, {rejectWithValue, dispatch}) => {
        try {
            const userName:string = localStorage.getItem(USER_NAME_LocalStorage) || '-';
            const res = await questionsAPI.postResponse(prompt, userName);
            return res.data.data
        } catch (err: any) {
            toast(err.response.data.message);
        }
    }
);

export const getHistoryThunk = createAsyncThunk(
    'questions/getHistoryThunk',
    async (_, {rejectWithValue, dispatch}) => {
        try {
            const res = await questionsAPI.getHistory();
            return res.data.data
        } catch (err: any) {
            toast(err.response.data.message);
        }
    }
);

