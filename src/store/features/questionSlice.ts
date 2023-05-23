import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { FAVORITE_PROMPTS, HISTORY, PROMPT, RESPONSE_GPT, TEMPORARY_QUESTIONS } from "./vars"

export type QuestionType = { 
    id: string
    question: string
    answer: string,
    color: string
}
export type HistoryType = {
    date: string,
    company: string,
    prompt: Array<string>,
    answer: string
}
export type PromptFavoriteType = {
    title: string,
    prompt: Array<string>
}
export type InitContectType = {
    questions: Array<QuestionType>,
    editableId: string,
    var: {
        isLoading: boolean,
        newQuestionText: string,
        newAnswertext: string,
        newPrompt: string,
        searchDateStart: string,
        searchDateEnd: string,
        searchText: string
        searchCompany: string,
        companyName: string,
        showPromptHistory: boolean,
        showResponseHistory: boolean
    },
    changedIdsList: Array<string>,
    prompt: Array<string>,
    responseGPT: string,
    history: Array<HistoryType>,
    favoritesPrompts: Array<PromptFavoriteType>
}

const initContentQuestionsSlice:InitContectType = {
    editableId: '',
    // companyName: 'company name',
    var: {
        isLoading: false,
        newQuestionText: '',
        newAnswertext: '',
        newPrompt: '',
        searchDateStart: '',
        searchDateEnd: '',
        searchText: '',
        searchCompany: '',
        companyName: '',
        showPromptHistory: false,
        showResponseHistory: false
    },
    prompt: PROMPT,
    responseGPT: RESPONSE_GPT,
    
    changedIdsList: [],
    questions: TEMPORARY_QUESTIONS,
    history: HISTORY,
    favoritesPrompts: FAVORITE_PROMPTS
}



export const questionsSlice = createSlice({
    name: 'questionsSlice',
    initialState: initContentQuestionsSlice,
    reducers: {
        changeEditableIdAC: (state: InitContectType, action: PayloadAction<string>) => {
            state.editableId = action.payload;
        },
        removeQuestionAC: (state: InitContectType, action: PayloadAction<string>):InitContectType => {
            return {
                ...state,
                questions: state.questions.filter(el => el.id !== action.payload)
            }
        },
        changeAllQustionsListAC: (state: InitContectType, action: PayloadAction<Array<QuestionType>>) => { state.questions = action.payload },
        changeQuestionAC: (state: InitContectType, action: PayloadAction<QuestionType>):InitContectType => {
            return {
                ...state, 
                questions: state.questions.map(elem => {
                    if (elem.id === action.payload.id)
                        return action.payload;
                    else
                        return elem;
                })
            }
        },
        changeTwoQuestionsOrderAC: (state: InitContectType, action: PayloadAction<number>) => {
            let a = [...state.questions];
            const i:number = action.payload;
            [a[i], a[i+1]] = [a[i+1], a[i]];
            state.questions = a;
        },
        addIdToChangedIdsListAC: (state: InitContectType, action: PayloadAction<string>):InitContectType => {
            return {
                ...state,
                changedIdsList: [...state.changedIdsList, action.payload]
            }
        },
        clearChangedIdsListAC: (state: InitContectType, action: PayloadAction<string>) => {
            state.changedIdsList = []
        },
        changeQuestionColorAC: (state: InitContectType, action: PayloadAction<{questionId: string, newColor: string}>):InitContectType => {
            return {
                ...state,
                questions: [...state.questions].map(currentQuestion => {
                    if (currentQuestion.id === action.payload.questionId) {
                        return {...currentQuestion, color: action.payload.newColor}
                    }
                    return currentQuestion;
                })
            }
        },
        changePromptAC: (state: InitContectType, action: PayloadAction<Array<string>>):InitContectType => {
            return {
                ...state, 
                prompt: action.payload
            }
        },
        changeNewPromptAC: (state: InitContectType, action: PayloadAction<string>):InitContectType => {
            return {
                ...state, 
                var: {
                    ...state.var, 
                    newPrompt: action.payload
                }
            }
        },
        changeGPTResponseAC: (state: InitContectType, action: PayloadAction<string>) => {
            state.responseGPT = action.payload
        },

        changeSearchTextAC: (state: InitContectType, action: PayloadAction<string>) => { state.var.searchText = action.payload },
        changeSearchCompanyAC: (state: InitContectType, action: PayloadAction<string>) => { state.var.searchCompany = action.payload },
        changeSearchDateStartAC: (state: InitContectType, action: PayloadAction<string>) => { state.var.searchDateStart = action.payload },
        changeSearchDateEndAC: (state: InitContectType, action: PayloadAction<string>) => { state.var.searchDateEnd = action.payload },
        changeCompanyNameAC: (state: InitContectType, action: PayloadAction<string>) => { state.var.companyName = action.payload },
        changeShowPromptFavoritesAC: (state: InitContectType, action: PayloadAction<boolean>) => { state.var.showPromptHistory = action.payload },
        changeShowResponseHistoryAC: (state: InitContectType, action: PayloadAction<boolean>) => { state.var.showResponseHistory = action.payload }
    },


    extraReducers: (builder) => {
        // builder.addCase(loginThunk.pending, (state: UserType) => {
        //     state.loadingStatus.loginRequestLoadingStatus = true;
        // })
        // builder.addCase(loginThunk.fulfilled, (state: UserType, action: PayloadAction<string>) => {
        //     state.loadingStatus.loginRequestLoadingStatus = false;
        // })
        // builder.addCase(loginThunk.rejected, (state: UserType) => {
        //     state.loadingStatus.loginRequestLoadingStatus = false;
        // })

       
    }
})
export const {changeEditableIdAC, changeQuestionAC, addIdToChangedIdsListAC, clearChangedIdsListAC, changeQuestionColorAC, 
    changePromptAC, changeNewPromptAC, changeSearchTextAC, changeSearchCompanyAC, changeCompanyNameAC,
    changeShowPromptFavoritesAC, changeGPTResponseAC, changeShowResponseHistoryAC, changeTwoQuestionsOrderAC,
    removeQuestionAC, changeAllQustionsListAC, changeSearchDateStartAC, changeSearchDateEndAC
} = questionsSlice.actions;

export default questionsSlice.reducer;