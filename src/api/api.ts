import axios, { AxiosResponse } from "axios";
import { QuestionType } from "../store/features/questionSlice";

const instance = axios.create({
    withCredentials: true,
    baseURL: 'http://95.217.84.190:35923/api/',
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
    getHistory: (): Promise<AxiosResponse> => {
        return instance.get('history');
    },
    postResponse: (prompt: Array<string>, userName: string): Promise<AxiosResponse> => {
        return instance.post('response', {prompt, userName});
    },
}