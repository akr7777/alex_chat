import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { deleteFavoriteHistoryThunk, deleteFavoritePromptsThunk, getFavoritePromptsThunk, getPromtThunk, 
    getQuestionsThunk, getResponseHistoryThunk, getWorkspaceThunk, postResponseThunk, postWorkspaceThunk, putFavoriteHistoryThunk, 
    putFavoritePromptsThunk, putPromptThunk, putQuestionsThunk, putWorkspaceThunk } from "./questionThunk"
import { HistoryResponseType, HistoryType, InitContectType, PromptFavoriteType, QuestionType, Workspace } from "./questionTypes"
import { initContentQuestionsSlice } from "../../functions/consts"
import uuid from "react-uuid"
import { toast } from "react-toastify"


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
        addIdToChangedIdsListAC: (state: InitContectType, action: PayloadAction<string>) => {
            // state.var.changedIdsList = state.var.changedIdsList.push(action.payload)
        },
        clearChangedIdsListAC: (state: InitContectType) => {
            state.var.changedIdsList = []
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
        addQuestionAC: (state: InitContectType) => {
            state.questions = [...state.questions, {id: uuid(), question: "Question", answer: "Answer", color: "black"}]
        }, 

        changeSearchTextAC: (state: InitContectType, action: PayloadAction<string>) => { state.var.searchText = action.payload },
        changeSearchCompanyAC: (state: InitContectType, action: PayloadAction<string>) => { state.var.searchCompany = action.payload },
        changeSearchDateStartAC: (state: InitContectType, action: PayloadAction<string>) => { state.var.searchDateStart = action.payload },
        changeSearchDateEndAC: (state: InitContectType, action: PayloadAction<string>) => { state.var.searchDateEnd = action.payload },
        // changeCompanyAC: (state: InitContectType, action: PayloadAction<string>) => { state.company = action.payload },
        changeShowPromptFavoritesAC: (state: InitContectType, action: PayloadAction<boolean>) => { state.var.showPromptHistory = action.payload },
        changeShowResponseHistoryAC: (state: InitContectType, action: PayloadAction<boolean>) => { state.var.showResponseHistory = action.payload },
        changeFooterHelpTextAC: (state: InitContectType, action: PayloadAction<string>) => { state.footerHelpText = action.payload; },
        changeFirstBlockWidthAC: (state: InitContectType, action: PayloadAction<boolean>) => { state.var.isFirstBlockShort = action.payload },
        changeTitleAC: (state: InitContectType, action: PayloadAction<string>) => { state.title = action.payload },
        changeIsPromptEditAC: (state: InitContectType, action: PayloadAction<boolean>) => { state.var.isPromptEdit = action.payload }
    },


    extraReducers: (builder) => {
        builder.addCase(getQuestionsThunk.pending, (state: InitContectType) => {
            state.varLoading.questionsLoading = true;
        })
        builder.addCase(getQuestionsThunk.fulfilled, (state: InitContectType, action: PayloadAction<Array<QuestionType>>) => {
            state.questions = action.payload;
            state.baseQuestions = [...action.payload];
            state.varLoading.questionsLoading = false;
        })
        builder.addCase(getQuestionsThunk.rejected, (state: InitContectType) => {
            state.varLoading.questionsLoading = false;
        })

        builder.addCase(putQuestionsThunk.pending, (state: InitContectType) => {
            state.varLoading.questionsLoading = true;
        })
        builder.addCase(putQuestionsThunk.fulfilled, (state: InitContectType, action: PayloadAction<Array<QuestionType>>) => {
            state.questions = action.payload;
            state.baseQuestions = [...action.payload];
            state.varLoading.questionsLoading = false;
        })
        builder.addCase(putQuestionsThunk.rejected, (state: InitContectType) => {
            state.varLoading.questionsLoading = false;
        })

        builder.addCase(getPromtThunk.pending, (state: InitContectType) => {
            state.varLoading.promptLoading = true;
        })
        builder.addCase(getPromtThunk.fulfilled, (state: InitContectType, action: PayloadAction<Array<string>>) => {
            state.prompt = action.payload;
            state.basePrompt = [...action.payload]
            state.varLoading.promptLoading = false;
        })
        builder.addCase(getPromtThunk.rejected, (state: InitContectType) => {
            state.varLoading.promptLoading = false;
        })

        builder.addCase(putPromptThunk.pending, (state: InitContectType) => {
            state.varLoading.promptLoading = true;
        })
        builder.addCase(putPromptThunk.fulfilled, (state: InitContectType, action: PayloadAction<Array<string>>) => {
            try {
                state.prompt = action.payload;
                state.basePrompt = [...action.payload]
            } catch {
                toast.error('Error')
            }
            state.varLoading.promptLoading = false;
        })
        builder.addCase(putPromptThunk.rejected, (state: InitContectType) => {
            state.varLoading.promptLoading = false;
        })

        builder.addCase(postResponseThunk.pending, (state: InitContectType) => {
            state.varLoading.responseLoading = true;
            // state.varLoading.promptLoading = true;
        })
        builder.addCase(postResponseThunk.fulfilled, (state: InitContectType, action: PayloadAction<string>) => {
            state.responseGPT = action.payload;
            state.varLoading.responseLoading = false;
            // state.varLoading.promptLoading = false;
        })
        builder.addCase(postResponseThunk.rejected, (state: InitContectType) => {
            state.varLoading.responseLoading = false;
            // state.varLoading.promptLoading = false;
        })


        
        builder.addCase(getFavoritePromptsThunk.pending, (state: InitContectType) => {
            state.varLoading.promptHistoryLoading = true;
        })
        builder.addCase(getFavoritePromptsThunk.fulfilled, (state: InitContectType, action: PayloadAction<Array<PromptFavoriteType>>) => {
            state.favoritesPrompts = action.payload;
            state.varLoading.promptHistoryLoading = false;
        })
        builder.addCase(getFavoritePromptsThunk.rejected, (state: InitContectType) => {
            state.varLoading.promptHistoryLoading = false;
        })

        builder.addCase(deleteFavoritePromptsThunk.pending, (state: InitContectType) => {
            state.varLoading.promptHistoryLoading = true;
        })
        builder.addCase(deleteFavoritePromptsThunk.fulfilled, (state: InitContectType, action: PayloadAction<Array<PromptFavoriteType>>) => {
            // state.favoritesPrompts = [...state.favoritesPrompts].filter( el => el.id !== action.payload.id );
            state.favoritesPrompts = action.payload;
            state.varLoading.promptHistoryLoading = false;
        })
        builder.addCase(deleteFavoritePromptsThunk.rejected, (state: InitContectType) => {
            state.varLoading.promptHistoryLoading = false;
        })

        builder.addCase(putFavoritePromptsThunk.pending, (state: InitContectType) => {
            state.varLoading.promptHistoryLoading = true;
        })
        builder.addCase(putFavoritePromptsThunk.fulfilled, (state: InitContectType, action: PayloadAction<PromptFavoriteType>) => {
            state.favoritesPrompts = [...state.favoritesPrompts, action.payload];
            state.varLoading.promptHistoryLoading = false;
        })
        builder.addCase(putFavoritePromptsThunk.rejected, (state: InitContectType) => {
            state.varLoading.promptHistoryLoading = false;
        })


        builder.addCase(getResponseHistoryThunk.pending, (state: InitContectType) => {
            state.varLoading.responseHistoryLoading = true;
        })
        builder.addCase(getResponseHistoryThunk.fulfilled, (state: InitContectType, action: PayloadAction<Array<HistoryResponseType>>) => {
            let historyArray:Array<HistoryType> = action.payload.map(elem => {
                return {
                    id: elem.id,
                    datetime: elem.datetime,
                    username: elem.request.username,
                    company: elem.request.company,
                    prompt: elem.request.prompt,
                    gpt_response: elem.gpt_response,
                    favorite: elem.favorite
                }
            })

            state.responseHistory = historyArray;
            state.varLoading.responseHistoryLoading = false;
        })
        builder.addCase(getResponseHistoryThunk.rejected, (state: InitContectType) => {
            state.varLoading.responseHistoryLoading = false;
        })


        builder.addCase(putFavoriteHistoryThunk.pending, (state: InitContectType) => {
            state.varLoading.responseHistoryLoading = true;
        })
        builder.addCase(putFavoriteHistoryThunk.fulfilled, (state: InitContectType, action: PayloadAction<Array<HistoryResponseType>>) => {
            let historyArray:Array<HistoryType> = action.payload.map(elem => {
                return {
                    id: elem.id,
                    datetime: elem.datetime,
                    username: elem.request.username,
                    company: elem.request.company,
                    prompt: elem.request.prompt,
                    gpt_response: elem.gpt_response,
                    favorite: elem.favorite
                }
            })

            state.responseHistory = historyArray;
            state.varLoading.responseHistoryLoading = false;
        })
        builder.addCase(putFavoriteHistoryThunk.rejected, (state: InitContectType) => {
            state.varLoading.responseHistoryLoading = false;
        })

        builder.addCase(deleteFavoriteHistoryThunk.pending, (state: InitContectType) => {
            state.varLoading.responseHistoryLoading = true;
        })
        builder.addCase(deleteFavoriteHistoryThunk.fulfilled, (state: InitContectType, action: PayloadAction<Array<HistoryResponseType>>) => {
            let historyArray:Array<HistoryType> = action.payload.map(elem => {
                return {
                    id: elem.id,
                    datetime: elem.datetime,
                    username: elem.request.username,
                    company: elem.request.company,
                    prompt: elem.request.prompt,
                    gpt_response: elem.gpt_response,
                    favorite: elem.favorite
                }
            })

            state.responseHistory = historyArray;
            state.varLoading.responseHistoryLoading = false;
        })
        builder.addCase(deleteFavoriteHistoryThunk.rejected, (state: InitContectType) => {
            state.varLoading.responseHistoryLoading = false;
        })


        builder.addCase(getWorkspaceThunk.pending, (state: InitContectType) => {
            state.varLoading.workspaceLoading = true;
        })
        builder.addCase(getWorkspaceThunk.fulfilled, (state: InitContectType, action: PayloadAction<Array<Workspace>>) => {
            state.workspaceList = action.payload;
            state.varLoading.workspaceLoading = false;
        })
        builder.addCase(getWorkspaceThunk.rejected, (state: InitContectType) => {
            state.varLoading.workspaceLoading = false;
        })

        builder.addCase(putWorkspaceThunk.pending, (state: InitContectType) => {
            state.varLoading.workspaceLoading = true;
        })
        builder.addCase(putWorkspaceThunk.fulfilled, (state: InitContectType, action: PayloadAction<Array<Workspace>>) => {
            state.workspaceList = action.payload;
            state.varLoading.workspaceLoading = false;
        })
        builder.addCase(putWorkspaceThunk.rejected, (state: InitContectType) => {
            state.varLoading.workspaceLoading = false;
        })

        builder.addCase(postWorkspaceThunk.pending, (state: InitContectType) => {
            state.varLoading.workspaceLoading = true;
        })
        builder.addCase(postWorkspaceThunk.fulfilled, (state: InitContectType, action: PayloadAction<Array<Workspace>>) => {
            state.workspaceList = action.payload;
            state.varLoading.workspaceLoading = false;
        })
        builder.addCase(postWorkspaceThunk.rejected, (state: InitContectType) => {
            state.varLoading.workspaceLoading = false;
        })

        // builder.addCase(deleteWorkspaceThunk.pending, (state: InitContectType) => {
        //     state.varLoading.workspaceLoading = true;
        // })
        // builder.addCase(deleteWorkspaceThunk.fulfilled, (state: InitContectType, action: PayloadAction<Array<Workspace>>) => {
        //     state.workspaceList = action.payload;
        //     state.varLoading.workspaceLoading = false;
        // })
        // builder.addCase(deleteWorkspaceThunk.rejected, (state: InitContectType) => {
        //     state.varLoading.workspaceLoading = false;
        // })
       
    }
})
export const {changeEditableIdAC, changeQuestionAC, addIdToChangedIdsListAC, clearChangedIdsListAC, changeQuestionColorAC, 
    changePromptAC, changeNewPromptAC, changeSearchTextAC, changeSearchCompanyAC,
    changeShowPromptFavoritesAC, changeGPTResponseAC, changeShowResponseHistoryAC, changeTwoQuestionsOrderAC,
    removeQuestionAC, changeAllQustionsListAC, changeSearchDateStartAC, changeSearchDateEndAC, addQuestionAC,
    changeFooterHelpTextAC, changeFirstBlockWidthAC, changeTitleAC, changeIsPromptEditAC
} = questionsSlice.actions;

export default questionsSlice.reducer;