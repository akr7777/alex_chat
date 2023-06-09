import { InitContectType } from "../store/features/questionTypes";

export const NEW_LINE_SEPARATOR = '\n\n';
export const SHORT_TEXT_LENGTH = 40;
export const USER_NAME_LocalStorage = 'username';
export const COMMON_DATE_TIME_FORMAT = "DD.MM.YYYY HH:mm";
export const COMMON_DATE_FORMAT = "YYYY-MM-DD";
export const COMPANY_LC = "company";
export const OPEN_TAG = '{';
export const CLOSE_TAG = '}';

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
        showResponseHistory: false,
        isFirstBlockShort: false,
        isPromptEdit: false,
    },
    prompt: [],
    responseGPT: '',
    // company: 'Some Company',
    // changedIdsList: [],
    // questions: TEMPORARY_QUESTIONS,
    // responseHistory: HISTORY,
    // favoritesPrompts: FAVORITE_PROMPTS
    questions: [],
    responseHistory: [],
    favoritesPrompts: [],
    footerHelpText: '',
    basePrompt: [],
    baseQuestions: [],
    title: 'TiTle'
}

