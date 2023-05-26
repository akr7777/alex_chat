import { useSelector } from 'react-redux';
import s from './blockTwo.module.css';
import { RootState, useAppDispatch } from '../../store/store';
import promptHistoryIcon from "./../../public/icons/history_icon_1.png";
import refreshRedIcon from "./../../public/icons/refresh_red_icon.png";
import favoritePromptIcon from "./../../public/icons/favorite_icon.png";

import editIcon from "./../../public/icons/edit_icon.png";
import saveIcon from "./../../public/icons/save_icon.png";
import okIcon from "./../../public/icons/ok_icon.png";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';
import MultilineText from '../../common/multilineText/multilineText';
import { AddAnswerToPrompt } from '../../functions/functions';
import { changeNewPromptAC, changePromptAC, changeShowPromptFavoritesAC } from '../../store/features/questionSlice';
import PromptFavorite from './promptFavorite/promptFavorite';
import { getPromtThunk, postResponseThunk } from '../../store/features/questionThunk';
import { NEW_LINE_SEPARATOR } from '../../functions/consts';

const BlockTwo = () => {
    const dispatch = useAppDispatch();
    const prompt: Array<string> = useSelector((state: RootState) => state.questions.prompt);
    const showPromptHistory: boolean = useSelector((state: RootState) => state.questions.var.showPromptHistory);

    const nonEditablePrompt: string = AddAnswerToPrompt(
        prompt
            .join(NEW_LINE_SEPARATOR)
            .replaceAll(NEW_LINE_SEPARATOR, ' <br/><br/> ')
    );

    const [isEdit, setIsEdit] = useState<boolean>(false);
    // const [isShowPromptHistory, setIsShowPromptHistory] = useState<boolean>(false);
    const newPrompt: string = useSelector((state: RootState) => state.questions.var.newPrompt);

    // const onDeleteClickHandler = () => {
    //     dispatch(changePromptAC([]));
    // }
    const onSavePromptToServerClickHandler = () => {
        const userAnswer: boolean = window.confirm("Уверены, что хотите сохранить эту версию промпта как базовую?");
        if (userAnswer) {
            toast.info("Новая версия сохранена.")
        }
    }
    const onRefreshPromptClickHandler = () => {
        // toast.info("Тут надо запросить старый промпт с сервера и обновить его в приложении")
        dispatch(getPromtThunk());
    }
    const onEditClickHandler = () => {
        dispatch(changeNewPromptAC(prompt.join(NEW_LINE_SEPARATOR)))
        setIsEdit(true);
    }
    const onSavePromptClickHandler = () => {
        setIsEdit(false);
        const newPromptArray:Array<string> = newPrompt.split(NEW_LINE_SEPARATOR);
        dispatch(changePromptAC(newPromptArray));
    }
    const onApproveClickHandler = () => {
        // toast.error("Запрос улетел на сервер...");
        // console.log('prompt.join()=',prompt.join());
        
        // dispatch(postResponseThunk(prompt.join(NEW_LINE_SEPARATOR)));
        dispatch(postResponseThunk(prompt));
    }
    const onDisabledApproveClickHandler = () => {
        toast.warning('Сначала надо завершить редактирование...');
    }
    const onNewPromptTextChange = (newText: string) => {
        dispatch(changeNewPromptAC(newText));
    }
    const onPromptHistoryClickHandler = () => {
        dispatch(changeShowPromptFavoritesAC(true))
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


        { showPromptHistory && <PromptFavorite />}
        
        
        <div className={s.titleDiv}>
            <strong>Ваш промпт:</strong>
        </div>

        <div className={s.promptDiv}>
            {
                isEdit
                    ? <MultilineText value={newPrompt} onValuechange={(newText) => onNewPromptTextChange(newText)} class={s.textAreaHeight} /> 
                    : <div className={s.promptTextDiv} dangerouslySetInnerHTML={{__html: nonEditablePrompt}} />
            }
        </div>

        <div className={s.buttonsDiv}>



            <img alt="" src={saveIcon} className={s.iconsImg} onClick={onSavePromptToServerClickHandler} />
            
            <img alt="" src={favoritePromptIcon} className={s.iconsImg} onClick={()=>{}} />
            
            <img alt="" src={promptHistoryIcon} className={s.iconsImg} onClick={onPromptHistoryClickHandler} />

            <img alt="" src={refreshRedIcon} className={s.iconsImg} onClick={onRefreshPromptClickHandler}/>

            {
                isEdit
                    ? <img alt="" src={saveIcon} className={s.iconsImg} onClick={onSavePromptClickHandler}/>
                    : <img alt="" src={editIcon} className={s.iconsImg} onClick={onEditClickHandler}/>
            }
            
            {  
                isEdit 
                    ? <img alt="" src={okIcon} className={s.iconsImg} onClick={onDisabledApproveClickHandler}/> 
                    : <img alt="" src={okIcon} className={s.iconsImg} onClick={onApproveClickHandler}/>
            }

        </div>
    </div>
}

export default BlockTwo;