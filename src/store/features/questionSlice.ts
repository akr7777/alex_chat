import { PayloadAction, createSlice } from "@reduxjs/toolkit"

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
        newAnswertext: '',
        newPrompt: ''
    },
    prompt: ["Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Integer vitae justo eget magna fermentum iaculis.", 
            "Non tellus orci ac auctor augue mauris augue. Lacus suspendisse faucibus interdum posuere lorem ipsum dolor sit amet. Feugiat in ante metus dictum at tempor. Ut ornare lectus sit amet. Lorem ipsum dolor sit amet.", "Etiam non quam lacus suspendisse. Tortor aliquam nulla facilisi cras fermentum odio eu. Quisque sagittis purus sit amet. Turpis massa tincidunt dui ut. Montes nascetur ridiculus mus mauris vitae ultricies leo. In dictum non consectetur a erat nam at. Eget mauris pharetra et ultrices neque ornare aenean euismod. Senectus et netus et malesuada fames. Faucibus turpis in eu mi bibendum neque egestas congue quisque. Leo duis ut diam quam Imperdiet dui accumsan sit amet nulla.", 
            "Duis at consectetur lorem donec. Sed ullamcorper morbi tincidunt ornare. Vitae justo eget magna fermentum iaculis. Eu ultrices vitae auctor eu augue ut lectus arcu. Fames ac turpis egestas integer. Quam adipiscing vitae proin sagittis nisl rhoncus mattis rhoncus. Egestas egestas fringilla phasellus faucibus scelerisque eleifend. Vitae auctor eu augue ut lectus. Non curabitur gravida arcu ac tortor dignissim convallis aenean et. Et egestas quis ipsum suspendisse. Ornare suspendisse sed nisi lacus sed viverra tellus in. Urna duis convallis convallis tellus id interdum velit. Non curabitur gravida arcu ac tortor dignissim convallis. Fermentum leo vel orci porta non pulvinar neque. Id leo in vitae turpis massa sed. Congue mauris rhoncus aenean vel elit. Adipiscing bibendum est ultricies integer. Faucibus in ornare quam viverra orci sagittis. Amet aliquam id diam maecenas. Donec et odio pellentesque diam volutpat commodo sed egestas egestas. Amet consectetur adipiscing elit ut aliquam. Curabitur gravida arcu ac tortor dignissim convallis aenean et tortor. Consequat mauris nunc congue nisi. Morbi tempus iaculis urna id volutpat. Eu consequat ac felis donec et odio. Amet purus gravida quis blandit turpis cursus in hac habitasse. Adipiscing diam donec adipiscing tristique risus nec feugiat in. Adipiscing at in tellus integer feugiat scelerisque varius morbi enim. Purus ut faucibus pulvinar elementum integer. Dictumst quisque sagittis purus sit amet volutpat consequat mauris. Diam donec adipiscing tristique risus nec. Ac feugiat sed lectus vestibulum mattis ullamcorper velit sed. Adipiscing diam donec adipiscing tristique risus nec feugiat in fermentum. Sagittis id consectetur purus ut. Consectetur purus ut faucibus pulvinar elementum.  Ac feugiat sed lectus vestibulum mattis ullamcorper velit sed. Adipiscing diam donec adipiscing tristique risus nec feugiat in fermentum. Sagittis id consectetur purus ut. Consectetur purus ut faucibus pulvinar elementum.  Ac feugiat sed lectus vestibulum mattis ullamcorper velit sed. Adipiscing diam donec adipiscing tristique risus nec feugiat in fermentum. Sagittis id consectetur purus ut. Consectetur purus ut faucibus pulvinar elementum.  Ac feugiat sed lectus vestibulum mattis ullamcorper velit sed. Adipiscing diam donec adipiscing tristique risus nec feugiat in fermentum. Sagittis id consectetur purus ut. Consectetur purus ut faucibus pulvinar elementum.1"],
    responseGPT: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Integer vitae justo eget magna fermentum iaculis. Non tellus orci ac auctor augue mauris augue. Lacus suspendisse faucibus interdum posuere lorem ipsum dolor sit amet. Feugiat in ante metus dictum at tempor. Ut ornare lectus sit amet. Lorem ipsum dolor sit amet. Etiam non quam lacus suspendisse. \n\nTortor aliquam nulla facilisi cras fermentum odio eu. Quisque sagittis purus sit amet. Turpis massa tincidunt dui ut. Montes nascetur ridiculus mus mauris vitae ultricies leo. In dictum non consectetur a erat nam at. Eget mauris pharetra et ultrices neque ornare aenean euismod. Senectus et netus et malesuada fames. Faucibus turpis in eu mi bibendum neque egestas congue quisque. Leo duis ut diam quam Imperdiet dui accumsan sit amet nulla. Duis at consectetur lorem donec. Sed ullamcorper morbi tincidunt ornare. Vitae justo eget magna fermentum iaculis. Eu ultrices vitae auctor eu augue ut lectus arcu. Fames ac turpis egestas integer. Quam adipiscing vitae proin sagittis nisl rhoncus mattis rhoncus. Egestas egestas fringilla phasellus faucibus scelerisque eleifend. Vitae auctor eu augue ut lectus. Non curabitur gravida arcu ac tortor dignissim convallis aenean et. Et egestas quis ipsum suspendisse. Ornare suspendisse sed nisi lacus sed viverra tellus in. Urna duis convallis convallis tellus id interdum velit. Non curabitur gravida arcu ac tortor dignissim convallis. Fermentum leo vel orci porta non pulvinar neque. Id leo in vitae turpis massa sed. Congue mauris rhoncus aenean vel elit. Adipiscing bibendum est ultricies integer. Faucibus in ornare quam viverra orci sagittis. Amet aliquam id diam maecenas. Donec et odio pellentesque diam volutpat commodo sed egestas egestas. Amet consectetur adipiscing elit ut aliquam. Curabitur gravida arcu ac tortor dignissim convallis aenean et tortor. Consequat mauris nunc congue nisi. Morbi tempus iaculis urna id volutpat. Eu consequat ac felis donec et odio. Amet purus gravida quis blandit turpis cursus in hac habitasse. Adipiscing diam donec adipiscing tristique risus nec feugiat in. Adipiscing at in tellus integer feugiat scelerisque varius morbi enim. Purus ut faucibus pulvinar elementum integer. Dictumst quisque sagittis purus sit amet volutpat consequat mauris. Diam donec adipiscing tristique risus nec. Ac feugiat sed lectus vestibulum mattis ullamcorper velit sed. Adipiscing diam donec adipiscing tristique risus nec feugiat in fermentum. Sagittis id consectetur purus ut. Consectetur purus ut faucibus pulvinar elementum.  Ac feugiat sed lectus vestibulum mattis ullamcorper velit sed. Adipiscing diam donec adipiscing tristique risus nec feugiat in fermentum. Sagittis id consectetur purus ut. Consectetur purus ut faucibus pulvinar elementum.  Ac feugiat sed lectus vestibulum mattis ullamcorper velit sed. Adipiscing diam donec adipiscing tristique risus nec feugiat in fermentum. Sagittis id consectetur purus ut. Consectetur purus ut faucibus pulvinar elementum.  Ac feugiat sed lectus vestibulum mattis ullamcorper velit sed. Adipiscing diam donec adipiscing tristique risus nec feugiat in fermentum. Sagittis id consectetur purus ut. Consectetur purus ut faucibus pulvinar elementum.2',

    changedIdsList: [],
    questions: [
    {
        id: '11111',
        question: 'question 1 text question 1 text question 1 text question 1 text',
        answer: 'answer 1 text answer 1 text answer 1 text ',
        color: ''
    },
    {
        id: '22222',
        question: 'question 2 text question 2 text question 2 text question 2 text',
        answer: 'answer 2 text answer 2 text answer 2 text ',
        color: ''
    },
    {
        id: '3',
        question: 'question 3 text question 3 text question 3 text question 3 text',
        answer: 'answer 3 text answer 3 text answer 3 text ',
        color: ''
    },
    {
        id: '4',
        question: 'question 4 text question 4 text question 4 text question 4 text',
        answer: 'answer 4 text answer 4 text answer 4 text ',
        color: ''
    },
    {
        id: '5',
        question: 'question 5 text question 5 text question 5 text question 5 text',
        answer: 'answer 5 text answer 5 text answer 5 text ',
        color: ''
    },
    {
        id: '6',
        question: 'question 6 text question 6 text question 6 text question 6 text',
        answer: 'answer 6 text answer 6 text answer 6 text ',
        color: ''
    },
    {
        id: '7',
        question: 'question 3 text question 3 text question 1 text question 1 text',
        answer: 'answer 3 text answer 3 text answer 1 text ',
        color: ''
    },
    {
        id: '8',
        question: 'question 3 text question 3 text question 1 text question 1 text',
        answer: 'answer 3 text answer 3 text answer 1 text ',
        color: ''
    },
    {
        id: '9',
        question: 'question 3 text question 3 text question 1 text question 1 text',
        answer: 'answer 3 text answer 3 text answer 1 text ',
        color: ''
    },
    {
        id: '10',
        question: 'question 3 text question 3 text question 1 text question 1 text',
        answer: 'answer 3 text answer 3 text answer 1 text ',
        color: ''
    },
    {
        id: '11',
        question: 'question 3 text question 3 text question 1 text question 1 text',
        answer: 'answer 3 text answer 3 text answer 1 text ',
        color: ''
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