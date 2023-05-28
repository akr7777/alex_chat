import s from "./blockTwo.module.css";
import promptHistoryIcon from "./../../public/icons/history_icon_1.png";
import refreshRedIcon from "./../../public/icons/refresh_red_icon.png";
import favoritePromptIcon from "./../../public/icons/favorite_icon.png";

import editIcon from "./../../public/icons/edit_icon.png";
import saveIcon from "./../../public/icons/save_icon.png";
import saveIcon2 from "./../../public/icons/save_icon_2.png";
import okIcon from "./../../public/icons/ok_icon.png";
import { COMPANY_LC, NEW_LINE_SEPARATOR } from "../../functions/consts";

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { RootState, useAppDispatch } from "../../store/store";
import { getPromtThunk, postResponseThunk, putPromptThunk } from "../../store/features/questionThunk";
import { changeNewPromptAC, changePromptAC, changeShowPromptFavoritesAC } from "../../store/features/questionSlice";
import { useSelector } from "react-redux";
import { useState } from "react";
import AddPromptToFavoriteWindow from "./promptFavorite/addPromptToFavoriteWindow";
import { AddAnswerForGPT, AddAnswerToPrompt, inputBracketsInText } from "../../functions/functions";
import { QuestionType } from "../../store/features/questionTypes";

type ButtonsPanelPropsType = {
    isEdit: boolean,
    setIsEdit: (newVal: boolean) => void
    prompt: Array<string>
    newPrompt: string,
}

const ButtonsPanel = (props: ButtonsPanelPropsType) => {
    const dispatch = useAppDispatch();
    const isResponseLoading: boolean = useSelector((state:RootState) => state.questions.varLoading.responseLoading);
    const company: string = localStorage.getItem(COMPANY_LC) || "SomeCompany";
    const questions:Array<QuestionType> = useSelector((state: RootState) => state.questions.questions);
    const [showAdd, setShowAdd] = useState<boolean>(false);

    const onDisabledButtonClickHandler = () => toast.warning('Сначала надо завершить редактирование...');

    const onSavePromptToServerClickHandler = () => {
        const userAnswer: boolean = window.confirm("Уверены, что хотите сохранить эту версию промпта как базовую?");
        if (userAnswer) {
            dispatch(putPromptThunk(props.prompt))
        }
    }
    const onAddToFavotitesPromtClickHandler = () => setShowAdd(true);

    const onRefreshPromptClickHandler = () => { dispatch(getPromtThunk()); }
    const onEditClickHandler = () => {
        dispatch(changeNewPromptAC(props.prompt.join(NEW_LINE_SEPARATOR)))
        props.setIsEdit(true);
    }
    const onSavePromptClickHandler = () => {
        props.setIsEdit(false);
        const newPromptArray:Array<string> = props.newPrompt.split(NEW_LINE_SEPARATOR);
        dispatch(changePromptAC(newPromptArray));
    }
    const onApproveClickHandler = () => {
        const promptForGPT: Array<string> = AddAnswerForGPT(props.prompt, questions)
        const dataToSend = {prompt: promptForGPT, company: company}
        // console.log('onApproveClickHandler / dataToSend=', dataToSend);
        dispatch(postResponseThunk(dataToSend));
        toast.info("Запрос улетел на сервер. Ожидание ответа может занять некоторое время...");
    }
    
    const onPromptHistoryClickHandler = () => { dispatch(changeShowPromptFavoritesAC(true)); }
    
    return <>
        {
            showAdd && <AddPromptToFavoriteWindow setShow={setShowAdd}/>
        }
        {
            isResponseLoading
                ? <></>
                : <div className={s.buttonsDiv}>

                    {
                        props.isEdit
                        
                            ? <img alt="" src={saveIcon2} className={s.iconsImg} onClick={onDisabledButtonClickHandler} />
                            : <img alt="" src={saveIcon2} className={s.iconsImg} onClick={onSavePromptToServerClickHandler} />
                    }
                    
                    {
                        props.isEdit
                            ? <img alt="" src={favoritePromptIcon} className={s.iconsImg} onClick={onDisabledButtonClickHandler} />
                            : <img alt="" src={favoritePromptIcon} className={s.iconsImg} onClick={onAddToFavotitesPromtClickHandler} />
                    }
                    
                    {
                        props.isEdit
                            ? <img alt="" src={promptHistoryIcon} className={s.iconsImg} onClick={onDisabledButtonClickHandler} />
                            : <img alt="" src={promptHistoryIcon} className={s.iconsImg} onClick={onPromptHistoryClickHandler} />
                    }
                    
                    {
                        props.isEdit
                            ? <img alt="" src={refreshRedIcon} className={s.iconsImg} onClick={onDisabledButtonClickHandler}/>
                            : <img alt="" src={refreshRedIcon} className={s.iconsImg} onClick={onRefreshPromptClickHandler}/>
                    }
                    
            
                    {
                        props.isEdit
                            ? <img alt="" src={saveIcon} className={s.iconsImg} onClick={onSavePromptClickHandler}/>
                            : <img alt="" src={editIcon} className={s.iconsImg} onClick={onEditClickHandler}/>
                    }
                    
                    {  
                        props.isEdit 
                            ? <img alt="" src={okIcon} className={s.iconsImg} onClick={onDisabledButtonClickHandler}/> 
                            : <img alt="" src={okIcon} className={s.iconsImg} onClick={onApproveClickHandler}/>
                    }
            
                </div>
        }
    </>
}

export default ButtonsPanel;