import s from "./blockTwo.module.css";
import promptHistoryIcon from "./../../public/icons/history_icon_1.png";
import refreshRedIcon from "./../../public/icons/refresh_red_icon.png";
import favoritePromptIcon from "./../../public/icons/favorite_icon.png";

import editIcon from "./../../public/icons/edit_icon.png";
import saveIcon from "./../../public/icons/save_icon.png";
import saveIcon2 from "./../../public/icons/save_icon_2.png";
import okIcon from "./../../public/icons/ok_icon.png";
import { NEW_LINE_SEPARATOR } from "../../functions/consts";

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { RootState, useAppDispatch } from "../../store/store";
import { getPromtThunk, postResponseThunk } from "../../store/features/questionThunk";
import { changeNewPromptAC, changePromptAC, changeShowPromptFavoritesAC } from "../../store/features/questionSlice";
import { useSelector } from "react-redux";
import { PromptFavoriteType } from "../../store/features/questionTypes";
import { useState } from "react";
import AddPromptToFavoriteWindow from "./promptFavorite/addPromptToFavoriteWindow";

type ButtonsPanelPropsType = {
    isEdit: boolean,
    setIsEdit: (newVal: boolean) => void
    prompt: Array<string>
    newPrompt: string,
}

const ButtonsPanel = (props: ButtonsPanelPropsType) => {
    const dispatch = useAppDispatch();
    const isResponseLoading: boolean = useSelector((state:RootState) => state.questions.varLoading.responseLoading);
    const company: string = useSelector((state: RootState) => state.questions.company);

    const [showAdd, setShowAdd] = useState<boolean>(false);

    
    // const onDeleteClickHandler = () => {
    //     dispatch(changePromptAC([]));
    // }
    // const onSavePromptToServerClickHandler = () => {
    //     const userAnswer: boolean = window.confirm("Уверены, что хотите сохранить эту версию промпта в избранное?");
    //     if (userAnswer) {
    //         console.log('ptops.prompt=', props.prompt);
            
    //     }
    // }
    const onAddToFavotitesPromtClickHandler = () => setShowAdd(true);
    const onAddToFavotitesPromtClickHandlerDisabled = () => toast.warning('Сначала надо завершить редактирование...');

    const onRefreshPromptClickHandler = () => {
        toast.info("Тут надо запросить старый промпт с сервера и обновить его в приложении")
        dispatch(getPromtThunk());
    }
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
        toast.info("Запрос улетел на сервер. Ожидание ответа может занять некоторое время...");
        const dataToSend = {prompt: props.prompt, company: company}
        dispatch(postResponseThunk(dataToSend));
    }
    const onDisabledApproveClickHandler = () => {
        toast.warning('Сначала надо завершить редактирование...');
    }
    
    const onPromptHistoryClickHandler = () => {
        dispatch(changeShowPromptFavoritesAC(true))
    }
    
    return <>
        {
            showAdd && <AddPromptToFavoriteWindow setShow={setShowAdd}/>
        }
        {
            isResponseLoading
                ? <></>
                : <div className={s.buttonsDiv}>

                    {/* <img alt="" src={saveIcon2} className={s.iconsImg} onClick={onSavePromptToServerClickHandler} /> */}
                    
                    {
                        props.isEdit
                            ? <img alt="" src={favoritePromptIcon} className={s.iconsImg} onClick={onAddToFavotitesPromtClickHandlerDisabled} />
                            : <img alt="" src={favoritePromptIcon} className={s.iconsImg} onClick={onAddToFavotitesPromtClickHandler} />
                    }
                    
                    <img alt="" src={promptHistoryIcon} className={s.iconsImg} onClick={onPromptHistoryClickHandler} />
            
                    <img alt="" src={refreshRedIcon} className={s.iconsImg} onClick={onRefreshPromptClickHandler}/>
            
                    {
                        props.isEdit
                            ? <img alt="" src={saveIcon} className={s.iconsImg} onClick={onSavePromptClickHandler}/>
                            : <img alt="" src={editIcon} className={s.iconsImg} onClick={onEditClickHandler}/>
                    }
                    
                    {  
                        props.isEdit 
                            ? <img alt="" src={okIcon} className={s.iconsImg} onClick={onDisabledApproveClickHandler}/> 
                            : <img alt="" src={okIcon} className={s.iconsImg} onClick={onApproveClickHandler}/>
                    }
            
                </div>
        }
    </>
}

export default ButtonsPanel;