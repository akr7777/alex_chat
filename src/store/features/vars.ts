import { HistoryType, PromptFavoriteType, QuestionType } from "./questionTypes"


export const PROMPT: string[] = [
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Integer vitae justo eget magna fermentum iaculis.", 
    "Non tellus orci ac auctor augue mauris augue. Lacus suspendisse faucibus interdum posuere lorem ipsum dolor sit amet. Feugiat in ante metus dictum at tempor. Ut ornare lectus sit amet. Lorem ipsum dolor sit amet.", "Etiam non quam lacus suspendisse. Tortor aliquam nulla facilisi cras fermentum odio eu. Quisque sagittis purus sit amet. Turpis massa tincidunt dui ut. Montes nascetur ridiculus mus mauris vitae ultricies leo. In dictum non consectetur a erat nam at. Eget mauris pharetra et ultrices neque ornare aenean euismod. Senectus et netus et malesuada fames. Faucibus turpis in eu mi bibendum neque egestas congue quisque. Leo duis ut diam quam Imperdiet dui accumsan sit amet nulla.", 
    "Duis at consectetur lorem donec. Sed ullamcorper morbi tincidunt ornare. Vitae justo eget magna fermentum iaculis. Eu ultrices vitae auctor eu augue ut lectus arcu. Fames ac turpis egestas integer. Quam adipiscing vitae proin sagittis nisl rhoncus mattis rhoncus. Egestas egestas fringilla phasellus faucibus scelerisque eleifend. Vitae auctor eu augue ut lectus. Non curabitur gravida arcu ac tortor dignissim convallis aenean et. Et egestas quis ipsum suspendisse. Ornare suspendisse sed nisi lacus sed viverra tellus in. Urna duis convallis convallis tellus id interdum velit. Non curabitur gravida arcu ac tortor dignissim convallis. Fermentum leo vel orci porta non pulvinar neque. Id leo in vitae turpis massa sed. Congue mauris rhoncus aenean vel elit. Adipiscing bibendum est ultricies integer. Faucibus in ornare quam viverra orci sagittis. Amet aliquam id diam maecenas. Donec et odio pellentesque diam volutpat commodo sed egestas egestas. Amet consectetur adipiscing elit ut aliquam. Curabitur gravida arcu ac tortor dignissim convallis aenean et tortor. Consequat mauris nunc congue nisi. Morbi tempus iaculis urna id volutpat. Eu consequat ac felis donec et odio. Amet purus gravida quis blandit turpis cursus in hac habitasse. Adipiscing diam donec adipiscing tristique risus nec feugiat in. Adipiscing at in tellus integer feugiat scelerisque varius morbi enim. Purus ut faucibus pulvinar elementum integer. Dictumst quisque sagittis purus sit amet volutpat consequat mauris. Diam donec adipiscing tristique risus nec. Ac feugiat sed lectus vestibulum mattis ullamcorper velit sed. Adipiscing diam donec adipiscing tristique risus nec feugiat in fermentum. Sagittis id consectetur purus ut. Consectetur purus ut faucibus pulvinar elementum.  Ac feugiat sed lectus vestibulum mattis ullamcorper velit sed. Adipiscing diam donec adipiscing tristique risus nec feugiat in fermentum. Sagittis id consectetur purus ut. Consectetur purus ut faucibus pulvinar elementum.  Ac feugiat sed lectus vestibulum mattis ullamcorper velit sed. Adipiscing diam donec adipiscing tristique risus nec feugiat in fermentum. Sagittis id consectetur purus ut. Consectetur purus ut faucibus pulvinar elementum.  Ac feugiat sed lectus vestibulum mattis ullamcorper velit sed. Adipiscing diam donec adipiscing tristique risus nec feugiat in fermentum. Sagittis id consectetur purus ut. Consectetur purus ut faucibus pulvinar elementum.1"
];


export const RESPONSE_GPT = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Integer vitae justo eget magna fermentum iaculis. Non tellus orci ac auctor augue mauris augue. Lacus suspendisse faucibus interdum posuere lorem ipsum dolor sit amet. Feugiat in ante metus dictum at tempor. Ut ornare lectus sit amet. Lorem ipsum dolor sit amet. Etiam non quam lacus suspendisse. \n\nTortor aliquam nulla facilisi cras fermentum odio eu. Quisque sagittis purus sit amet. Turpis massa tincidunt dui ut. Montes nascetur ridiculus mus mauris vitae ultricies leo. In dictum non consectetur a erat nam at. Eget mauris pharetra et ultrices neque ornare aenean euismod. Senectus et netus et malesuada fames. Faucibus turpis in eu mi bibendum neque egestas congue quisque. Leo duis ut diam quam Imperdiet dui accumsan sit amet nulla. Duis at consectetur lorem donec. Sed ullamcorper morbi tincidunt ornare. Vitae justo eget magna fermentum iaculis. Eu ultrices vitae auctor eu augue ut lectus arcu. Fames ac turpis egestas integer. Quam adipiscing vitae proin sagittis nisl rhoncus mattis rhoncus. Egestas egestas fringilla phasellus faucibus scelerisque eleifend. Vitae auctor eu augue ut lectus. Non curabitur gravida arcu ac tortor dignissim convallis aenean et. Et egestas quis ipsum suspendisse. Ornare suspendisse sed nisi lacus sed viverra tellus in. Urna duis convallis convallis tellus id interdum velit. Non curabitur gravida arcu ac tortor dignissim convallis. Fermentum leo vel orci porta non pulvinar neque. Id leo in vitae turpis massa sed. Congue mauris rhoncus aenean vel elit. Adipiscing bibendum est ultricies integer. Faucibus in ornare quam viverra orci sagittis. Amet aliquam id diam maecenas. Donec et odio pellentesque diam volutpat commodo sed egestas egestas. Amet consectetur adipiscing elit ut aliquam. Curabitur gravida arcu ac tortor dignissim convallis aenean et tortor. Consequat mauris nunc congue nisi. Morbi tempus iaculis urna id volutpat. Eu consequat ac felis donec et odio. Amet purus gravida quis blandit turpis cursus in hac habitasse. Adipiscing diam donec adipiscing tristique risus nec feugiat in. Adipiscing at in tellus integer feugiat scelerisque varius morbi enim. Purus ut faucibus pulvinar elementum integer. Dictumst quisque sagittis purus sit amet volutpat consequat mauris. Diam donec adipiscing tristique risus nec. Ac feugiat sed lectus vestibulum mattis ullamcorper velit sed. Adipiscing diam donec adipiscing tristique risus nec feugiat in fermentum. Sagittis id consectetur purus ut. Consectetur purus ut faucibus pulvinar elementum.  Ac feugiat sed lectus vestibulum mattis ullamcorper velit sed. Adipiscing diam donec adipiscing tristique risus nec feugiat in fermentum. Sagittis id consectetur purus ut. Consectetur purus ut faucibus pulvinar elementum.  Ac feugiat sed lectus vestibulum mattis ullamcorper velit sed. Adipiscing diam donec adipiscing tristique risus nec feugiat in fermentum. Sagittis id consectetur purus ut. Consectetur purus ut faucibus pulvinar elementum.  Ac feugiat sed lectus vestibulum mattis ullamcorper velit sed. Adipiscing diam donec adipiscing tristique risus nec feugiat in fermentum. Sagittis id consectetur purus ut. Consectetur purus ut faucibus pulvinar elementum.2';

export const TEMPORARY_QUESTIONS:Array<QuestionType> = [
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
    ];

    export const HISTORY:Array<HistoryType> = [
        {
            id: '',
            datetime: '2023.05.20',
            username: "user",
            company: 'company 1 one',
            prompt: ['prompt answer 1 text answer 1 text answer 1 text uno begin long text prompt begin long text \n\n prompt begin long text prompt begin long text prompt begin \n\nlong text prompt begin long text prompt begin long text prompt begin long text prompt begin long text prompt begin long text prompt begin long text prompt begin long text prompt begin long text prompt begin long text prompt begin long text prompt begin long text prompt begin long text prompt begin long text prompt begin long text prompt begin long text prompt begin long text prompt begin long text prompt begin long text prompt begin long text prompt begin long text prompt begin long text prompt begin long text prompt begin long text prompt begin long text prompt begin long text prompt begin long text prompt begin long text prompt begin long text prompt begin long text prompt begin long text prompt begin long text prompt begin long text prompt begin long text prompt begin long text prompt begin long text prompt begin long text prompt begin long text prompt begin long text prompt begin long text prompt begin long text prompt begin long text prompt begin long text prompt begin long text prompt begin long text prompt begin long text prompt begin long text prompt begin long text prompt begin long text prompt begin long text prompt begin long text prompt begin long text prompt begin long text prompt begin long text prompt begin long text prompt begin long text prompt begin long text prompt begin long text prompt begin long text '],
            gpt_response: 'GPT rrr answer long text GPT answer long text GPT answer long text GPT answer long text GPT answer long text GPT answer long text GPT answer long text GPT answer long text GPT answer long text GPT answer long text GPT answer long text GPT answer long text GPT answer long text GPT answer long text GPT answer long text GPT answer long text GPT answer long text GPT answer long text GPT answer long text GPT answer long text GPT answer long text GPT answer long text GPT answer long text GPT answer long text GPT answer long text GPT answer long text GPT answer long text GPT answer long text GPT answer long text GPT answer long text GPT answer long text GPT answer long text GPT answer long text GPT answer long text GPT answer long text GPT answer long text GPT answer long text GPT answer long text GPT answer long text GPT answer long text GPT answer long text GPT answer long text GPT answer long text GPT answer long text GPT answer long text GPT answer long text GPT answer long text GPT answer long text GPT answer long text GPT answer long text GPT answer long text GPT answer long text GPT answer long text GPT answer long text GPT answer long text GPT answer long text GPT answer long text GPT answer long text GPT answer long text GPT answer long text GPT answer long text GPT answer long text GPT answer long text GPT answer long text GPT answer long text GPT answer long text GPT answer long text GPT answer long text GPT answer long text GPT answer long text GPT answer long text GPT answer long text GPT answer long text GPT answer long text GPT answer long text GPT answer long text GPT answer long text GPT answer long text GPT answer long text GPT answer long text ',
            favorite: false,
        },
        {
            id: '',
            username: "user",
            datetime: '2023.05.23',
            company: 'company 2 two',
            prompt: ['prompt dos begin long text prompt begin long text prompt begin long text prompt begin long text prompt begin long text prompt begin long text prompt begin long text '],
            gpt_response: 'GPT ttt answer long text GPT answer long text GPT answer long text GPT answer long text GPT answer long text GPT answer long text GPT answer long text GPT answer long text GPT answer long text GPT answer long text ',
            favorite: false,
        },
        {
            id: '',
            username: "user",
            datetime: '2023.05.25',
            company: 'company 3 three',
            prompt: ['prompt tres begin long text prompt begin long text prompt begin long text prompt begin long text prompt begin long text prompt begin long text prompt begin long text '],
            gpt_response: 'GPT bbb answer long text GPT answer long text GPT answer long text GPT answer long text GPT answer long text GPT answer long text GPT answer long text GPT answer long text GPT answer long text GPT answer long text ',
            favorite: false,
        }
    ];

    export const FAVORITE_PROMPTS:Array<PromptFavoriteType> = [
        {
            id: '0009911',
            title: 'prompt fav 1',
            // prompt: ['sdff', 'sdf', 'sdf', 'sdff', 'sdf', 'sdf', 'sdff', 'sdf', 'sdf', 'sdff', 'sdf', 'sdf', 'sdff', 'sdf', 'sdf', 'sdff', 'sdf', 'sdf', 'sdff', 'sdf', 'sdf', 'sdff', 'sdf', 'sdf', 'sdff', 'sdf', 'sdf', 'sdff', 'sdf', 'sdf', 'sdff', 'sdf', 'sdf', 'sdff', 'sdf', 'sdf', 'sdff', 'sdf', 'sdf', 'sdff', 'sdf', 'sdf', 'sdff', 'sdf', 'sdf', 'sdff', 'sdf', 'sdf', 'sdff', 'sdf', 'sdf', 'sdff', 'sdf', 'sdf']
            prompt: ['sdff lsfhs', 'sdf slfhsf sdf slfhsf sdf slfhsf sdf slfhsf sdf slfhsf sdf slfhsf sdf slfhsf sdf slfhsf sdf slfhsf sdf slfhsf sdf slfhsf sdf slfhsf sdf slfhsf sdf slfhsf sdf slfhsf sdf slfhsf sdf slfhsf sdf slfhsf sdf slfhsf sdf slfhsf sdf slfhsf sdf slfhsf sdf slfhsf sdf slfhsf', 'sdf'],
            date_added: ''
        },
        {
            id: '00023323',
            title: 'prompt fav 1',
            prompt: ['sdff', 'sdf', 'sdf'],
            date_added: ''
        },
        {
            id: '000033333',
            title: 'prompt fav 1',
            prompt: ['sdff', 'sdf', 'sdf'],
            date_added: ''
        }
    ]