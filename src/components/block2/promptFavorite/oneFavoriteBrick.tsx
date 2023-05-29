import { useState } from "react";
import { NEW_LINE_SEPARATOR, SHORT_TEXT_LENGTH } from "../../../functions/consts";
// import s from "./../../../common/brickCSS/bricks.module.css";
import s from "./promptFavorite.module.css";
import { inputBracketsInText } from "../../../functions/functions";
import { changePromptAC, changeShowPromptFavoritesAC } from "../../../store/features/questionSlice";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../../store/store";
import { PromptFavoriteType, QuestionType } from "../../../store/features/questionTypes";
import removeIcon from '../../../public/icons/remove_icon_1.png';
import { postFavoritePromptsThunk } from "../../../store/features/questionThunk";

type OneFavoriteBrickPropsType = {
    id: string,
    title: string,
    prompt: Array<string>
}
const OneFavoriteBrick = (props: OneFavoriteBrickPropsType) => {

    const [isShort, setIsShort] = useState<boolean>(true);
    const dispatch = useAppDispatch();
    const questions: Array<QuestionType> = useSelector( (state: RootState) => state.questions.questions);
    const favoritesPrompts:Array<PromptFavoriteType> = useSelector((state: RootState) => state.questions.favoritesPrompts);


    const promptText: string = isShort 
                                ? props.prompt.join(NEW_LINE_SEPARATOR).slice(0, SHORT_TEXT_LENGTH) + "..."
                                : props.prompt.join(NEW_LINE_SEPARATOR)

    const onPromptClickHandler = () => {
        const newPrompt: Array<string> = inputBracketsInText(props.prompt, questions);
        dispatch(changePromptAC(newPrompt));
        dispatch(changeShowPromptFavoritesAC(false))
    }

    const onRemoveClickHandler = () => {
        dispatch(postFavoritePromptsThunk(
            favoritesPrompts.filter(el => el.id !== props.id)
        ));
    } 

    return <div 
                className={s.bricksDivShort}
                onDoubleClick={() => setIsShort(!isShort)}
            >
        <div className={s.oneSection + " " + s.linkLabel} onClick={onPromptClickHandler}>
            {props.title}
        </div>
        <div className={s.oneSection}>
            {promptText}
        </div>
        <div className={s.oneSection}>
            <img alt={"REMOVE"} src={removeIcon} className={s.small_icons} onClick={onRemoveClickHandler}/>
        </div>
    </div>
}

export default OneFavoriteBrick;