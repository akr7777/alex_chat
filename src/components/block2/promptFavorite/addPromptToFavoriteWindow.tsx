import { useSelector } from "react-redux";
import { PromptFavoriteType } from "../../../store/features/questionTypes";
import s from "./promptFavorite.module.css";
import { RootState, useAppDispatch } from "../../../store/store";
import okIcon from "./../../../public/icons/ok_icon.png";
import cancelIcon from "./../../../public/icons/cancel_icon.png";
import { useState } from "react";
import {LineTextField} from './../../../common/lineTextField/labelLineText';
import { postFavoritePromptsThunk } from "../../../store/features/questionThunk";
import uuid from "react-uuid";

type AddPromptToFavoriteWindowPropsType = {
    // show: boolean,
    setShow: (val: boolean) => void
}
const AddPromptToFavoriteWindow = (props: AddPromptToFavoriteWindowPropsType) => {
    const dispatch = useAppDispatch();
    const favorites: Array<PromptFavoriteType> = useSelector((state:RootState) => state.questions.favoritesPrompts);
    const prompt: Array<string> = useSelector((state:RootState) => state.questions.prompt);
    const [title, setTitle] = useState<string>('');

    const onCancelClickHandler = () => props.setShow(false);
    const onOKClickHandler = () => {
        const objectToAdd:PromptFavoriteType = {
            id: uuid(),
            title: title,
            prompt: prompt
        }
        const dataToSend:Array<PromptFavoriteType> = [...favorites, objectToAdd]
        dispatch(postFavoritePromptsThunk(dataToSend))
    }
    
    return <div className={s.promptHistoryLayout}>
        <div className={s.addPromptToFavoriteWindow}>
            <h3>Название:</h3>

            <LineTextField type={"text"} text={title} onChangeFunction={(val) => setTitle(val)} className={s.textAreaHeight}/>

            <h3>Текст промпта:</h3>
            {prompt}
            <div>
                <img alt="" src={cancelIcon} onClick={onCancelClickHandler} className={s.iconsImg}/>
                <img alt="" src={okIcon} onClick={onOKClickHandler} className={s.iconsImg}/>
            </div>
        </div>
    </div>
}

export default AddPromptToFavoriteWindow;