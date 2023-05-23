import { useState } from "react";
import { NEW_LINE_SEPARATOR, SHORT_TEXT_LENGTH } from "../../../functions/consts";
// import s from "./../../../common/brickCSS/bricks.module.css";
import s from "./promptFavorite.module.css";
import { inputBracketsInText } from "../../../functions/functions";
import { QuestionType, changePromptAC, changeShowPromptFavoritesAC } from "../../../store/features/questionSlice";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../../store/store";

type OneFavoriteBrickPropsType = {
    title: string,
    prompt: Array<string>
}
const OneFavoriteBrick = (props: OneFavoriteBrickPropsType) => {

    const [isShort, setIsShort] = useState<boolean>(true);
    const dispatch = useAppDispatch();
    const questions: Array<QuestionType> = useSelector( (state: RootState) => state.questions.questions);

    const promptText: string = isShort 
                                ? props.prompt.join(NEW_LINE_SEPARATOR).slice(0, SHORT_TEXT_LENGTH) + "..."
                                : props.prompt.join(NEW_LINE_SEPARATOR)

    const onPromptClickHandler = () => {
        const newPrompt: Array<string> = inputBracketsInText(props.prompt, questions);
        dispatch(changePromptAC(newPrompt));
        dispatch(changeShowPromptFavoritesAC(false))
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
    </div>
}

export default OneFavoriteBrick;