import axios, { AxiosResponse } from "axios";

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https:/example.com:5000/api/',
});

// instance.interceptors.request.use((config)=> {
//     if (config.headers)
//         config.headers.Authorization = `Bearer ${localStorage.getItem('accessToken')}`;
//     return config;
// });

export const mainAPI = {
    // getAnswer: (bodyData: getAnswerThunkBodyType): Promise<AxiosResponse> => {
    //     return instance.post('myEndpoint', bodyData)
    // }
    // login: (credentials: loginThunkPropsType):Promise<AxiosResponse> => {
    //     return instance.post('login', credentials);
    // }
}