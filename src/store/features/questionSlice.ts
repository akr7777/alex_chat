import { PayloadAction, createSlice } from "@reduxjs/toolkit"

export type QuestionType = { 
    id: string
    question: string
    answer: string,
    
}
export type InitContectType = {
    questions: Array<QuestionType>,
    editableId: string,
    var: {
        isLoading: boolean,
        newQuestionText: string,
        newAnswertext: string,
    },
    changedIdsList: Array<string>
    // changeText: {
    //     question: string,
    //     answer: string
    // }
}

const initContentQuestionsSlice:InitContectType = {
    editableId: '',
    var: {
        isLoading: false,
        newQuestionText: '',
        newAnswertext: ''
    },
    // changeText: {
    //     question: '',
    //     answer: ''
    // },
    changedIdsList: [],
    questions: [
    {
        id: '1',
        question: 'question 1 text question 1 text question 1 text question 1 text',
        answer: 'answer 1 text answer 1 text answer 1 text '
    },
    {
        id: '2',
        question: 'question 2 text question 2 text question 2 text question 2 text',
        answer: 'answer 2 text answer 2 text answer 2 text '
    },
    {
        id: '3',
        question: 'question 3 text question 3 text question 3 text question 3 text',
        answer: 'answer 3 text answer 3 text answer 3 text '
    },
    {
        id: '4',
        question: 'question 4 text question 4 text question 4 text question 4 text',
        answer: 'answer 4 text answer 4 text answer 4 text '
    },
    {
        id: '5',
        question: 'question 5 text question 5 text question 5 text question 5 text',
        answer: 'answer 5 text answer 5 text answer 5 text '
    },
    {
        id: '6',
        question: 'question 3 text question 3 text question 1 text question 1 text',
        answer: 'answer 3 text answer 3 text answer 1 text '
    },
    {
        id: '7',
        question: 'question 3 text question 3 text question 1 text question 1 text',
        answer: 'answer 3 text answer 3 text answer 1 text '
    },
    {
        id: '8',
        question: 'question 3 text question 3 text question 1 text question 1 text',
        answer: 'answer 3 text answer 3 text answer 1 text '
    },
    {
        id: '9',
        question: 'question 3 text question 3 text question 1 text question 1 text',
        answer: 'answer 3 text answer 3 text answer 1 text '
    },
    {
        id: '10',
        question: 'question 3 text question 3 text question 1 text question 1 text',
        answer: 'answer 3 text answer 3 text answer 1 text '
    },
    {
        id: '11',
        question: 'question 3 text question 3 text question 1 text question 1 text',
        answer: 'answer 3 text answer 3 text answer 1 text '
    }
    ]
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
export const {changeEditableIdAC, removeQuestionAC, changeQuestionAC, addIdToChangedIdsListAC, clearChangedIdsListAC} = questionsSlice.actions;

export default questionsSlice.reducer;