import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { PROMPT, RESPONSE_GPT, TEMPORARY_QUESTIONS } from "./vars"

export type QuestionType = { 
    id: string
    question: string
    answer: string,
    color: string
}
export type InitContectType = {
    questions: Array<QuestionType>,
    editableId: string,
    var: {
        isLoading: boolean,
        newQuestionText: string,
        newAnswertext: string,
        newPrompt: string
    },
    changedIdsList: Array<string>,
    prompt: Array<string>,
    responseGPT: string,
    // companyName: string
}

const initContentQuestionsSlice:InitContectType = {
    editableId: '',
    // companyName: 'company name',
    var: {
        isLoading: false,
        newQuestionText: '',
        newAnswertext: '',
        newPrompt: ''
    },
    prompt: PROMPT,
    responseGPT: RESPONSE_GPT,
    
    changedIdsList: [],
    questions: TEMPORARY_QUESTIONS
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
    changePromptAC, changeNewPromptAC} = questionsSlice.actions;

export default questionsSlice.reducer;