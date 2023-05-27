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
        return instance.put('prompt', data);
    },
    getPromptFavorites: (): Promise<AxiosResponse> => {
        return instance.get("favoritesPrompts");
    },
    postPromptFavorites: (data:Array<PromptFavoriteType>): Promise<AxiosResponse> => {
        return instance.post("favoritesPrompts", data);
    },
    getResponseHistory: (): Promise<AxiosResponse> => {
        return instance.get('history');
    },
    postResponse: (prompt: Array<string>, username: string, company: string): Promise<AxiosResponse> => {
        return instance.post('response', {prompt: prompt, username: username, company: company});
    },
    // postResponse: (prompt: Array<string>): Promise<AxiosResponse> => {
    //     return instance.post('response', prompt);
    // },
}