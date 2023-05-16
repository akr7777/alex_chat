import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type IdIndexType = {
    id: string,
    index: number
}
type initContentPromptSliceType = {
    prompt: string,
    idIndex: Array<IdIndexType>,
    responseGPT: string,
}
const initContentPromptSlice: initContentPromptSliceType = {
    
    prompt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    idIndex: [{id: '1', index: 3}, {id: '4', index: 7}],
    responseGPT: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Integer vitae justo eget magna fermentum iaculis. Non tellus orci ac auctor augue mauris augue. Lacus suspendisse faucibus interdum posuere lorem ipsum dolor sit amet. Feugiat in ante metus dictum at tempor. Ut ornare lectus sit amet. Lorem ipsum dolor sit amet. Etiam non quam lacus suspendisse. Tortor aliquam nulla facilisi cras fermentum odio eu. Quisque sagittis purus sit amet. Turpis massa tincidunt dui ut. Montes nascetur ridiculus mus mauris vitae ultricies leo. In dictum non consectetur a erat nam at. Eget mauris pharetra et ultrices neque ornare aenean euismod. Senectus et netus et malesuada fames. Faucibus turpis in eu mi bibendum neque egestas congue quisque. Leo duis ut diam quam /n Imperdiet dui accumsan sit amet nulla. Duis at consectetur lorem donec. Sed ullamcorper morbi tincidunt ornare. Vitae justo eget magna fermentum iaculis. Eu ultrices vitae auctor eu augue ut lectus arcu. Fames ac turpis egestas integer. Quam adipiscing vitae proin sagittis nisl rhoncus mattis rhoncus. Egestas egestas fringilla phasellus faucibus scelerisque eleifend. Vitae auctor eu augue ut lectus. Non curabitur gravida arcu ac tortor dignissim convallis aenean et. Et egestas quis ipsum suspendisse. /n Ornare suspendisse sed nisi lacus sed viverra tellus in. Urna duis convallis convallis tellus id interdum velit. Non curabitur gravida arcu ac tortor dignissim convallis. Fermentum leo vel orci porta non pulvinar neque. Id leo in vitae turpis massa sed. Congue mauris rhoncus aenean vel elit. Adipiscing bibendum est ultricies integer. Faucibus in ornare quam viverra orci sagittis. Amet aliquam id diam maecenas. Donec et odio pellentesque diam volutpat commodo sed egestas egestas. Amet consectetur adipiscing elit ut aliquam. Curabitur gravida arcu ac tortor dignissim convallis aenean et tortor. Consequat mauris nunc congue nisi. Morbi tempus iaculis urna id volutpat. Eu consequat ac felis donec et odio. Amet purus gravida quis blandit turpis cursus in hac habitasse. Adipiscing diam donec adipiscing tristique risus nec feugiat in. Adipiscing at in tellus integer feugiat scelerisque varius morbi enim. Purus ut faucibus pulvinar elementum integer. Dictumst quisque sagittis purus sit amet volutpat consequat mauris. Diam donec adipiscing tristique risus nec. Ac feugiat sed lectus vestibulum mattis ullamcorper velit sed. Adipiscing diam donec adipiscing tristique risus nec feugiat in fermentum. Sagittis id consectetur purus ut. Consectetur purus ut faucibus pulvinar elementum.'
    // responseGPT: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit'
}

export const promptSlice = createSlice({
    name: 'promptSlice',
    initialState: initContentPromptSlice,
    reducers: {
        changePromptAC: (state: initContentPromptSliceType, action: PayloadAction<string>) => {
            state.prompt = action.payload;
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
export const {changePromptAC} = promptSlice.actions;

export default promptSlice.reducer;