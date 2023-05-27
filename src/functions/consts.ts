import { InitContectType } from "../store/features/questionTypes";
import { FAVORITE_PROMPTS, HISTORY, PROMPT, RESPONSE_GPT, TEMPORARY_QUESTIONS } from "../store/features/vars";

export const NEW_LINE_SEPARATOR = '\n\n';
export const SHORT_TEXT_LENGTH = 40;
export const USER_NAME_LocalStorage = 'username';
export const COMMON_DATE_TIME_FORMAT = "DD.MM.YYYY HH:mm";

export const initContentQuestionsSlice:InitContectType = {
    editableId: '',
    // companyName: 'company name',
    varLoading: {
        questionsLoading: false,
        promptLoading: false,
        responseLoading: false,
        promptHistoryLoading: false,
        responseHistoryLoading: false
    },
    var: {
        changedIdsList: [],
        newQuestionText: '',
        newAnswertext: '',
        newPrompt: '',
        searchDateStart: '',
        searchDateEnd: '',
        searchText: '',
        searchCompany: '',
        showPromptHistory: false,
        showResponseHistory: false
    },
    prompt: PROMPT,
    responseGPT: '',
    company: 'Some Company',
    // changedIdsList: [],
    questions: TEMPORARY_QUESTIONS,
    responseHistory: HISTORY,
    favoritesPrompts: FAVORITE_PROMPTS
}

