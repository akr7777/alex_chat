import { useSelector } from 'react-redux';
import s from './blockTwo.module.css';
import { RootState, useAppDispatch } from '../../store/store';
import deleteIcon from "./../../public/icons/delete_icon.png";
import refreshRedIcon from "./../../public/icons/refresh_red_icon.png";
import savePromptIcon from "./../../public/icons/save_icon_3.png";

import editIcon from "./../../public/icons/edit_icon.png";
import saveIcon from "./../../public/icons/save_icon_2.png";
import okIcon from "./../../public/icons/ok_icon.png";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';
import MultilineText from '../../common/multilineText/multilineText';
import { AddAnswerToPrompt } from '../../common/functions';
import { changeNewPromptAC, changePromptAC } from '../../store/features/questionSlice';

const BlockTwo = () => {
    const dispatch = useAppDispatch();
    const prompt: Array<string> = useSelector((state: RootState) => state.questions.prompt);

    const nonEditablePrompt: string = AddAnswerToPrompt(prompt.join('\n\n').replaceAll('\n\n', ' <br/><br/> '));

    const [isEdit, setIsEdit] = useState<boolean>(false);
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
        toast.info("Тут надо запросить старый промпт с сервера и обновить его в приложении")
    }
    const onEditClickHandler = () => {
        dispatch(changeNewPromptAC(prompt.join('\n\n')))
        setIsEdit(true);
    }
    const onSavePromptClickHandler = () => {
        setIsEdit(false);
        const newPromptArray:Array<string> = newPrompt.split('\n\n');
        dispatch(changePromptAC(newPromptArray));
    }
    const onApproveClickHandler = () => {
        console.log(prompt);
        
        toast.error("Запрос улетел на сервер...");
    }
    const onDisabledApproveClickHandler = () => {
        toast.warning('Сначала надо завершить редактирование...');
    }
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

        <div className={s.promptDiv}>
            {
                isEdit
                    ? <MultilineText value={newPrompt} onValuechange={(newText) => onNewPromptTextChange(newText)} class={s.textAreaHeight} /> 
                    : <div className={s.promptTextDiv} dangerouslySetInnerHTML={{__html: nonEditablePrompt}} />
            }
        </div>

        <div className={s.buttonsDiv}>

            <img alt="" src={savePromptIcon} className={s.iconsImg} onClick={onSavePromptToServerClickHandler} />

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