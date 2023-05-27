import { useSelector } from 'react-redux';
import s from './blockTwo.module.css';
import { RootState, useAppDispatch } from '../../store/store';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react';
import MultilineText from '../../common/multilineText/multilineText';
import { AddAnswerToPrompt } from '../../functions/functions';
import { changeNewPromptAC } from '../../store/features/questionSlice';
import PromptFavorite from './promptFavorite/promptFavorite';
import { getPromtThunk } from '../../store/features/questionThunk';
import { NEW_LINE_SEPARATOR } from '../../functions/consts';
import ButtonsPanel from './buttonsPanel';
import Preloader from '../../common/preloader/preloader';

const BlockTwo = () => {
    const dispatch = useAppDispatch();
    const prompt: Array<string> = useSelector((state: RootState) => state.questions.prompt);
    const isLoading: boolean = useSelector((state:RootState) => state.questions.varLoading.promptLoading);

    useEffect(() => {
        dispatch(getPromtThunk());
    }, [])

    const showPromptHistory: boolean = useSelector((state: RootState) => state.questions.var.showPromptHistory);

    const nonEditablePrompt: string = AddAnswerToPrompt(
        prompt
            .join(NEW_LINE_SEPARATOR)
            .replaceAll(NEW_LINE_SEPARATOR, ' <br/><br/> ')
    );

    const [isEdit, setIsEdit] = useState<boolean>(false);
    // const [isShowPromptHistory, setIsShowPromptHistory] = useState<boolean>(false);
    const newPrompt: string = useSelector((state: RootState) => state.questions.var.newPrompt);

    

    const onNewPromptTextChange = (newText: string) => {
        dispatch(changeNewPromptAC(newText));
    }

    return <div className={s.promptWrapperDiv}>

        <ToastContainer
            position="top-right"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
        />

        <div className={s.titleDiv}>
            <strong>Ваш промпт:</strong>
        </div>

        {
            isLoading
                ? <Preloader />
                : <>
                    { showPromptHistory && <PromptFavorite />}

                    <div className={s.promptDiv}>
                        {
                            isEdit
                                ? <MultilineText value={newPrompt} onValuechange={(newText) => onNewPromptTextChange(newText)} class={s.textAreaHeight} /> 
                                : <div className={s.promptTextDiv} dangerouslySetInnerHTML={{__html: nonEditablePrompt}} />
                        }
                    </div>

                    <ButtonsPanel isEdit={isEdit} setIsEdit={setIsEdit} prompt={prompt} newPrompt={newPrompt} />
                </>
        }
        

        
    </div>
}

export default BlockTwo;