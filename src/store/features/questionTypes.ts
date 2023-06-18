export type QuestionType = { 
    id: string
    question: string
    answer: string,
    color: string
}
export type HistoryType = {
    id: string,
    datetime: string,
    username: string,
    company: string,
    prompt: Array<string>,
    gpt_response: string
    favorite: boolean
}
export type HistoryResponseType = {
    id: string
    datetime: string,
    gpt_response: string,
    request: {
        company: string
        username: string
        prompt: Array<string>
    }
    favorite: boolean
}
export type PromptFavoriteType = {
    id: string
    title: string,
    prompt: Array<string>
    date_added: string
}
export type Workspace = {
    id: string,
    title: string,
    initial: boolean
}


export type InitContectType = {
    editableId: string,
    varLoading: {
        questionsLoading: boolean
        promptLoading: boolean
        responseLoading: boolean
        promptHistoryLoading: boolean
        responseHistoryLoading: boolean
        workspaceLoading: boolean
    }
    var: {
        changedIdsList: Array<string>,
        newQuestionText: string,
        newAnswertext: string,
        newPrompt: string,
        searchDateStart: string,
        searchDateEnd: string,
        searchText: string
        searchCompany: string,
        showPromptHistory: boolean,
        showResponseHistory: boolean,
        isFirstBlockShort: boolean,
        isPromptEdit: boolean
    },
    // company: string
    questions: Array<QuestionType>,
    prompt: Array<string>,
    favoritesPrompts: Array<PromptFavoriteType>
    responseGPT: string,
    responseHistory: Array<HistoryType>,
    footerHelpText: string,
    basePrompt: Array<string>,
    baseQuestions: Array<QuestionType>,
    title: string,

    workspaceList: Array<Workspace>
    currentWorkspaceId: string
}
