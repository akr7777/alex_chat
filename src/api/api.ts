import axios, { AxiosResponse } from "axios";
import { PromptFavoriteType, QuestionType } from "../store/features/questionTypes";

const instance = axios.create({
    // withCredentials: true,
    baseURL: 'http://95.217.84.190:35923/api/',
    // baseURL: 'http://95.142.46.27:8000/api/',
    // baseURL: 'http://127.0.0.1:8000/'
});

// instance.interceptors.request.use((config)=> {
//     if (config.headers)
//         config.headers.Authorization = `Bearer ${localStorage.getItem('accessToken')}`;
//     return config;
// });

export const questionsAPI = {
    getQuestions: (): Promise<AxiosResponse> => {
        return instance.get('questions');
    },
    putQuestions: (data: Array<QuestionType>) => {
        return instance.put('questions', data);
    },
    getPrompt: (): Promise<AxiosResponse> => {
        return instance.get('prompt');
    },
    putPrompt: (data: Array<string>): Promise<AxiosResponse> => {
        return instance.put('prompt', {prompt: data});
    },
    getPromptFavorites: (): Promise<AxiosResponse> => {
        return instance.get("favoritePrompts");
    },
    putPromptFavorites: (data:Omit<PromptFavoriteType, "date_added">): Promise<AxiosResponse> => {
        return instance.put("favoritePrompts", data);
    },
    deletePromptFavorites: (id: string): Promise<AxiosResponse> => {
        return instance.delete("favoritePrompts?id="+id);
        // return instance.delete("favoritesPrompts", id);
    },
    getResponseHistory: (): Promise<AxiosResponse> => {
        return instance.get('history');
    },
    putResponse: (prompt: Array<string>, username: string, company: string): Promise<AxiosResponse> => {
        return instance.put('response', {prompt: prompt, username: username, company: company});
    },
    putFavoriteHistory: (id: string): Promise<AxiosResponse> => {
        return instance.put("favoriteHistory?id="+id);
    },
    deleteFavoriteHistory: (id: string): Promise<AxiosResponse> => {
        return instance.delete("favoriteHistory?id="+id);
    },
}