import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { questionsAPI } from "../../api/api";
import { PromptFavoriteType, QuestionType } from "./questionTypes";
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
            if (res.data.data) {
                return res.data.data
            } else {
                toast.error(res.data.msg);
            }

        } catch (err: any) {
            toast.error(err.response.data.message);
        }
    }
);


export const getPromtThunk = createAsyncThunk(
    'questions/getPromtThunk',
    async (_, {rejectWithValue, dispatch}) => {
        try {
            const res = await questionsAPI.getPrompt();
            return res.data.data.prompt
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
    async (data: {prompt: Array<string>, company: string}, {rejectWithValue, dispatch}) => {
        try {
            const username:string = localStorage.getItem(USER_NAME_LocalStorage) || '-';
            // const res = await questionsAPI.postResponse(prompt, userName);
            const res = await questionsAPI.postResponse(data.prompt, username, data.company);
            return res.data.data.gpt_response;
        } catch (err: any) {
            toast.error(err.response.data.message);
        }
    }
);

export const getFavoritePromptsThunk = createAsyncThunk(
    'questions/getFavoritePromptsThunk',
    async (_, {rejectWithValue, dispatch}) => {
        try {
            const res = await questionsAPI.getPromptFavorites();
            return res.data.data
        } catch (err: any) {
            toast(err.response.data.message);
        }
    }
);

export const postFavoritePromptsThunk = createAsyncThunk(
    'questions/postFavoritePromptsThunk',
    async (data: Array<PromptFavoriteType>, {rejectWithValue, dispatch}) => {
        try {
            const res = await questionsAPI.postPromptFavorites(data);
            return res.data.data
        } catch (err: any) {
            toast(err.response.data.message);
        }
    }
);

export const getResponseHistoryThunk = createAsyncThunk(
    'questions/getResponseHistoryThunk',
    async (_, {rejectWithValue, dispatch}) => {
        try {
            const res = await questionsAPI.getResponseHistory();
            return res.data.data
        } catch (err: any) {
            toast(err.response.data.message);
        }
    }
);

