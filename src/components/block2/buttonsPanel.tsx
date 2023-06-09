import s from "./blockTwo.module.css";
import promptHistoryIcon from "./../../public/icons/book_icon.png";
import promptHistoryIconDisabled from "./../../public/icons/book_icon_disabled.png";
import refreshRedIcon from "./../../public/icons/refresh_red_icon.png";
import refreshRedIconDisabled from "./../../public/icons/refresh_red_icon_disabled.png";
import favoritePromptIcon from "./../../public/icons/favorite_icon.png";
import favoritePromptIconDisabled from "./../../public/icons/star_icon_empty_disabled.png";
import editIcon from "./../../public/icons/edit_icon.png";
import saveIcon from "./../../public/icons/save_icon.png";
import saveIcon2 from "./../../public/icons/save_icon_2.png";
import okIcon from "./../../public/icons/ok_icon.png";
import okIconDisabled from "./../../public/icons/ok_icon_disabled.png";
import saveDisabledIcon from '../../public/icons/save_icon_disabled.png';

import { COMPANY_LC, NEW_LINE_SEPARATOR } from "../../functions/consts";

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { RootState, useAppDispatch } from "../../store/store";
import { getPromtThunk, postResponseThunk, putPromptThunk } from "../../store/features/questionThunk";
import { changeFooterHelpTextAC, changeIsPromptEditAC, changeNewPromptAC, changePromptAC, changeShowPromptFavoritesAC } from "../../store/features/questionSlice";
import { useSelector } from "react-redux";
import { useState } from "react";
import AddPromptToFavoriteWindow from "./promptFavorite/addPromptToFavoriteWindow";
import { AddAnswerForGPT } from "../../functions/functions";
import { QuestionType } from "../../store/features/questionTypes";

type ButtonsPanelPropsType = {
    // isEdit: boolean,
    // setIsEdit: (newVal: boolean) => void
    prompt: Array<string>
    newPrompt: string,
}

const ButtonsPanel = (props: ButtonsPanelPropsType) => {
    const dispatch = useAppDispatch();
    const isResponseLoading: boolean = useSelector((state:RootState) => state.questions.varLoading.responseLoading);
    const company: string = localStorage.getItem(COMPANY_LC) || "SomeCompany";
    const questions:Array<QuestionType> = useSelector((state: RootState) => state.questions.questions);
    const [showAdd, setShowAdd] = useState<boolean>(false);

    const prompt: Array<string> = useSelector((state: RootState) => state.questions.prompt);
    const basePrompt: Array<string> = useSelector((state: RootState) => state.questions.basePrompt);
    const isPromptsEqual: boolean = JSON.stringify(prompt) === JSON.stringify(basePrompt) 
    const isPromptEdit: boolean = useSelector((state: RootState) => state.questions.var.isPromptEdit);

    const onDisabledButtonClickHandler = () => toast.warning('Сначала надо завершить редактирование...');
    const onDisablaedSaveIconClickHandler = () => toast.info('Текущая версия промпта не отличается от базовой. Не нужно ничего сохранять на сервер');

    const onSavePromptToServerClickHandler = () => {
        const userAnswer: boolean = window.confirm("Уверены, что хотите сохранить эту версию промпта как базовую?");
        if (userAnswer) {
            dispatch(putPromptThunk(props.prompt))
        }
    }
    const onAddToFavotitesPromtClickHandler = () => setShowAdd(true);

    const onRefreshPromptClickHandler = () => { dispatch(getPromtThunk()); }
    const onEditClickHandler = () => {
        dispatch(changeNewPromptAC(props.prompt.join(NEW_LINE_SEPARATOR)));
        dispatch(changeIsPromptEditAC(true));
        // props.setIsEdit(true);
    }
    const onSavePromptClickHandler = () => {
        dispatch(changeIsPromptEditAC(false));
        // props.setIsEdit(false);
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
            showAdd && <AddPromptToFavoriteWindow prompt={prompt} setShow={setShowAdd}/>
        }
        {
            isResponseLoading
                ? <></>
                : <div className={s.buttonsDiv}>

                    {
                        isPromptEdit
                        
                            ? <img alt="" src={saveDisabledIcon} className={s.iconsImg} 
                                onClick={onDisabledButtonClickHandler} 
                                onMouseOver={() => dispatch(changeFooterHelpTextAC("Сохранить эту версию промпта как базовую"))}
                                onMouseLeave={() => dispatch(changeFooterHelpTextAC(""))}
                            />
                            : isPromptsEqual
                                ?   <img alt="" src={saveDisabledIcon} className={s.iconsImg} 
                                        onClick={onDisablaedSaveIconClickHandler} 
                                        onMouseOver={() => dispatch(changeFooterHelpTextAC("Сохранить эту версию промпта как базовую"))}
                                        onMouseLeave={() => dispatch(changeFooterHelpTextAC(""))}
                                    />
                                :  <img alt="" src={saveIcon2} className={s.iconsImg} 
                                        onClick={onSavePromptToServerClickHandler} 
                                        onMouseOver={() => dispatch(changeFooterHelpTextAC("Сохранить эту версию промпта как базовую"))}
                                        onMouseLeave={() => dispatch(changeFooterHelpTextAC(""))}
                                    />
                    }
                    
                    {
                        isPromptEdit
                            ? <img alt="" src={favoritePromptIconDisabled} className={s.iconsImg} 
                                onClick={onDisabledButtonClickHandler}
                                onMouseOver={() => dispatch(changeFooterHelpTextAC("Добавить данную версию промпта в Избранное"))}
                                onMouseLeave={() => dispatch(changeFooterHelpTextAC(""))}
                            />
                            : <img alt="" src={favoritePromptIcon} className={s.iconsImg} 
                                onClick={onAddToFavotitesPromtClickHandler} 
                                onMouseOver={() => dispatch(changeFooterHelpTextAC("Добавить данную версию промпта в Избранное"))}
                                onMouseLeave={() => dispatch(changeFooterHelpTextAC(""))}
                            />
                    }
                    
                    {
                        isPromptEdit
                            ? <img alt="" src={promptHistoryIconDisabled} className={s.iconsImg} 
                                onClick={onDisabledButtonClickHandler} 
                                onMouseOver={() => dispatch(changeFooterHelpTextAC("Открыть список Избранных промптов"))}
                                onMouseLeave={() => dispatch(changeFooterHelpTextAC(""))}
                            />
                            : <img alt="" src={promptHistoryIcon} className={s.iconsImg} 
                                onClick={onPromptHistoryClickHandler} 
                                onMouseOver={() => dispatch(changeFooterHelpTextAC("Открыть список Избранных промптов"))}
                                onMouseLeave={() => dispatch(changeFooterHelpTextAC(""))}
                            />
                    }
                    
                    {
                        isPromptEdit
                            ? <img alt="" src={refreshRedIconDisabled} className={s.iconsImg} 
                                onClick={onDisabledButtonClickHandler}
                                onMouseOver={() => dispatch(changeFooterHelpTextAC("Удалить все изменения и вернуть базовый промпт"))}
                                onMouseLeave={() => dispatch(changeFooterHelpTextAC(""))}
                            />
                            : <img alt="" src={refreshRedIcon} className={s.iconsImg} 
                                onClick={onRefreshPromptClickHandler}
                                onMouseOver={() => dispatch(changeFooterHelpTextAC("Удалить все изменения и вернуть базовый промпт"))}
                                onMouseLeave={() => dispatch(changeFooterHelpTextAC(""))}
                            />
                    }
                    
            
                    {
                        isPromptEdit
                            ? <img alt="" src={saveIcon} className={s.iconsImg} 
                                onClick={onSavePromptClickHandler}
                                onMouseOver={() => dispatch(changeFooterHelpTextAC("Редактировать промпт"))}
                                onMouseLeave={() => dispatch(changeFooterHelpTextAC(""))}
                            />
                            : <img alt="" src={editIcon} className={s.iconsImg} 
                                onClick={onEditClickHandler}
                                onMouseOver={() => dispatch(changeFooterHelpTextAC("Редактировать промпт"))}
                                onMouseLeave={() => dispatch(changeFooterHelpTextAC(""))}
                            />
                    }
                    
                    {  
                        isPromptEdit
                            ? <img alt="" src={okIconDisabled} className={s.iconsImg} 
                                onClick={onDisabledButtonClickHandler}
                                onMouseOver={() => dispatch(changeFooterHelpTextAC("Отправить запрос в GPT"))}
                                onMouseLeave={() => dispatch(changeFooterHelpTextAC(""))}
                            /> 
                            : <img alt="" src={okIcon} className={s.iconsImg} 
                                onClick={onApproveClickHandler}
                                onMouseOver={() => dispatch(changeFooterHelpTextAC("Отправить запрос в GPT"))}
                                onMouseLeave={() => dispatch(changeFooterHelpTextAC(""))}
                            />
                    }
            
                </div>
        }
    </>
}

export default ButtonsPanel;