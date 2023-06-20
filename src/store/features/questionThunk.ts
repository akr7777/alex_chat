import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { questionsAPI } from "../../api/api";
import { PromptFavoriteType, QuestionType } from "./questionTypes";
import { USER_NAME_LocalStorage } from "../../functions/consts";

export const getWorkspaceThunk = createAsyncThunk(
    'questions/getWorkspace',
    async (_, {rejectWithValue, dispatch}) => {
        try {
            const res = await questionsAPI.getWorkspace();
            return res.data.data
        } catch (err: any) {
            toast(err.response.data.message);
        }
    }
);
export const putWorkspaceThunk = createAsyncThunk(
    'questions/putWorkspaceThunk',
    async (id: string, {rejectWithValue, dispatch}) => {
        try {
            const res = await questionsAPI.putWorkspace(id);
            dispatch(getPromtThunk());
            dispatch(getQuestionsThunk());
            return res.data.data
        } catch (err: any) {
            toast(err.response.data.message);
        }
    }
);
export type PostWorkspaceThunkPropsType = {id: string, title: string}
export const postWorkspaceThunk = createAsyncThunk(
    'questions/postWorkspaceThunk',
    async (data: PostWorkspaceThunkPropsType, {rejectWithValue, dispatch}) => {
        try {
            const res = await questionsAPI.postWorkspace(data);
            return res.data.data
        } catch (err: any) {
            toast(err.response.data.message);
        }
    }
);
// export const deleteWorkspaceThunk = createAsyncThunk(
//     'questions/deleteWorkspaceThunk',
//     async (id: string, {rejectWithValue, dispatch}) => {
//         try {
//             const res = await questionsAPI.deleteWorkspace(id);
//             return res.data.data
//         } catch (err: any) {
//             toast(err.response.data.message);
//         }
//     }
// );

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
            
            if (res.data.status === "error") {
                toast.error(res.data.message);
                return []
            }
            return res.data.data.prompt;
        } catch (err: any) {
            toast.error(err.response.data.message);
        }
    }
);

export const postResponseThunk = createAsyncThunk(
    'questions/postResponseThunk',
    async (data: {prompt: Array<string>, company: string}, {rejectWithValue, dispatch}) => {
        try {
            const username:string = localStorage.getItem(USER_NAME_LocalStorage) || '-';
            // const res = await questionsAPI.postResponse(prompt, userName);
            const res = await questionsAPI.putResponse(data.prompt, username, data.company);
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

export const deleteFavoritePromptsThunk = createAsyncThunk(
    'questions/deleteFavoritePromptsThunk',
    async (id: string, {rejectWithValue, dispatch}) => {
        try {
            const res = await questionsAPI.deletePromptFavorites(id);
            return res.data.data
        } catch (err: any) {
            toast(err.response.data.message);
        }
    }
);

export const putFavoritePromptsThunk = createAsyncThunk(
    'questions/postFavoritePromptsThunk',
    async (data: Omit<PromptFavoriteType, "date_added">, {rejectWithValue, dispatch}) => {
        try {
            const res = await questionsAPI.putPromptFavorites(data);
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
            return res.data.data;
        } catch (err: any) {
            toast(err.response.data.message);
        }
    }
);

export const putFavoriteHistoryThunk = createAsyncThunk(
    'questions/putFavoriteHistoryThunk',
    async (id: string, {rejectWithValue, dispatch}) => {
        try {
            const res = await questionsAPI.putFavoriteHistory(id);
            return res.data.data;
        } catch (err: any) {
            toast(err.response.data.message);
        }
    }
);

export const deleteFavoriteHistoryThunk = createAsyncThunk(
    'questions/deleteFavoriteHistoryThunk',
    async (id: string, {rejectWithValue, dispatch}) => {
        try {
            const res = await questionsAPI.deleteFavoriteHistory(id);
            return res.data.data;
        } catch (err: any) {
            toast(err.response.data.message);
        }
    }
);
