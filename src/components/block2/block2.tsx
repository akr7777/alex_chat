import { useSelector } from 'react-redux';
import s from './blockTwo.module.css';
import { RootState, useAppDispatch } from '../../store/store';
import { changePromptAC } from '../../store/features/promptSlice';
import deleteIcon from "./../../public/icons/delete_icon.png";
import editIcon from "./../../public/icons/edit_icon.png";
import saveIcon from "./../../public/icons/save_icon_2.png";
import okIcon from "./../../public/icons/ok_icon.png";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';
import MultilineText from '../../common/multilineText/multilineText';
import { addAnswerToPrompt } from '../../common/functions';

const BlockTwo = () => {
    const dispatch = useAppDispatch();
    const prompt: Array<string> = useSelector((state: RootState) => state.prompt.prompt);
    const questions = useSelector((state: RootState) => state.questions.questions);

    const nonEditablePrompt: string = addAnswerToPrompt(prompt.join('\n\n').replaceAll('\n\n', '<br/><br/>'), questions);

    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [newPrompt, setNewPrompt] = useState<string>(prompt.join('\n\n'));

    const onDeleteClickHandler = () => {
        dispatch(changePromptAC([]));
    }
    const onEditClickHandler = () => {
        setIsEdit(true);
    }
    const onSaveClickHandler = () => {
        setIsEdit(false);
        // alert('On Save Click: ' + newPrompt)
        const newPromptArray:Array<string> = newPrompt.split('\n\n');
        dispatch(changePromptAC(newPromptArray));
    }
    const onApproveClickHandler = () => {
        toast.error("Запрос улетел на сервер...");
    }
    const onDisabledApproveClickHandler = () => {
        toast.warning('Сначала надо завершить редактирование...');
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
                    ? <MultilineText value={newPrompt} onValuechange={(newText) => setNewPrompt(newText)} class={''}/> 
                    : <div className={s.promptTextDiv} dangerouslySetInnerHTML={{__html: nonEditablePrompt}} />
            }
        </div>

        <div className={s.buttonsDiv}>
            <img alt="" src={deleteIcon} className={s.iconsImg} onClick={onDeleteClickHandler}/>

            {
                isEdit
                    ? <img alt="" src={saveIcon} className={s.iconsImg} onClick={onSaveClickHandler}/>
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