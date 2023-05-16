import { useSelector } from 'react-redux';
import s from './blockTwo.module.css';
import { RootState, useAppDispatch } from '../../store/store';
import { IdIndexType, changePromptAC } from '../../store/features/promptSlice';
import deleteIcon from "./../../public/icons/delete_icon.png";
import editIcon from "./../../public/icons/edit_icon.png";
import saveIcon from "./../../public/icons/save_icon_2.png";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';
import BigText from '../../common/bigText/bigText';

const BlockTwo = () => {
    const dispatch = useAppDispatch();
    const prompt: string = useSelector((state: RootState) => state.prompt.prompt);
    const promptArray: Array<string> = prompt.split(' ');
    const idIndexArr: Array<IdIndexType> = useSelector((state: RootState) => state.prompt.idIndex);
    const questions = useSelector((state: RootState) => state.questions.questions);

    idIndexArr.forEach( idElem => {
        const wordToPaste: string | undefined = questions.find( qElem => qElem.id === idElem.id)?.answer;
        if (wordToPaste) {
            promptArray.splice(idElem.index, 0, wordToPaste)
        }
            
    })

    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [newPrompt, setNewPrompt] = useState<string>(prompt);

    const onDeleteClickHandler = () => {
        dispatch(changePromptAC(''));
    }
    const onEditClickHandler = () => {
        setIsEdit(true);
    }
    const onSaveClickHandler = () => {
        setIsEdit(false);
        dispatch(changePromptAC(newPrompt));
    }
    const onApproveClickHandler = () => {
        toast.error("Запрос улетел на сервер...");
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
                    ? <BigText value={promptArray.join(' ')} onValueChange={setNewPrompt}/>
                    : <>{ promptArray.join(' ') }</>
            }
        </div>

        <div className={s.buttonsDiv}>
            <button onClick={onApproveClickHandler}>Подтвердить</button>
            {
                isEdit
                    ? <img alt="" src={saveIcon} className={s.iconsImg} onClick={onSaveClickHandler}/>
                    : <img alt="" src={editIcon} className={s.iconsImg} onClick={onEditClickHandler}/>
            }
            
            <img alt="" src={deleteIcon} className={s.iconsImg} onClick={onDeleteClickHandler}/>
        </div>
    </div>
}

export default BlockTwo;