import { useState } from "react";
import s from "./bricks.module.css";
import { changeFooterHelpTextAC, changeGPTResponseAC, changePromptAC, changeShowResponseHistoryAC } from "../../../../store/features/questionSlice";
import { RootState, useAppDispatch } from "../../../../store/store";

import okIcon from "./../../../../public/icons/ok_icon.png";
import starIconFilled from "./../../../../public/icons/star_icon_filled.png";
import starIconEmpty from "./../../../../public/icons/star_icon_empty.png";

import { COMMON_DATE_TIME_FORMAT, NEW_LINE_SEPARATOR, SHORT_TEXT_LENGTH } from "../../../../functions/consts";
import { inputBracketsInText } from "../../../../functions/functions";
import { useSelector } from "react-redux";
import { HistoryType, PromptFavoriteType, QuestionType } from "../../../../store/features/questionTypes";
import dayjs from "dayjs";
import { FAVORITE_HISTORY_ITEMS_LC, addToFavoriteThisHistoryItem, removeThisItemFromFavorite } from "./oneBrickFunctions";
// import AddPromptToFavoriteWindow from "../../../block2/promptFavorite/addPromptToFavoriteWindow";
// import { postFavoritePromptsThunk } from "../../../../store/features/questionThunk";

type OneBrickPropsType = {
    elem: HistoryType,
    index: number
}

const OneBrick = (props: OneBrickPropsType) => {
    const dispatch = useAppDispatch();
    const [isShort, setIsShort] = useState<boolean>(true);
    const questions:Array<QuestionType> = useSelector((state:RootState) => state.questions.questions);
    // const favoritePrompts: Array<PromptFavoriteType> = useSelector((state: RootState) => state.questions.favoritesPrompts);

    const dateAndTime: string = dayjs(props.elem.datetime).format(COMMON_DATE_TIME_FORMAT);
    // const isThisPromptFavorite: boolean = favoritePrompts.some(el => JSON.stringify(el.prompt) === JSON.stringify(props.elem.prompt) );
    
    // let favPromptId: string | undefined;
    // if (isThisPromptFavorite)
    //     favPromptId = favoritePrompts.find(el => JSON.stringify(el.prompt) === JSON.stringify(props.elem.prompt) )?.id;

    const onChooseBrickClickHandler = () => {
        const newPrompt: Array<string> = inputBracketsInText(props.elem.prompt, questions);
        dispatch(changePromptAC(newPrompt));
        dispatch(changeGPTResponseAC(props.elem.gpt_response));
        dispatch(changeShowResponseHistoryAC(false));
    }
    const promptView: string = 
        isShort 
            ? props.elem.prompt.join(NEW_LINE_SEPARATOR).slice(0, SHORT_TEXT_LENGTH).trim() + "..." 
            : props.elem.prompt.join(NEW_LINE_SEPARATOR).trim();

    const responseView: string = 
        isShort 
            ? props.elem.gpt_response.slice(0, SHORT_TEXT_LENGTH).trim() + "..." 
            : props.elem.gpt_response.trim();


    // const [showAddToFavorite, setShowAddToFavorite] = useState<boolean>(false);
    const isThisPromptFavorite: boolean = localStorage.getItem(FAVORITE_HISTORY_ITEMS_LC)
        ? localStorage.getItem(FAVORITE_HISTORY_ITEMS_LC)?.includes(props.elem.datetime) || false
        : false
    const removePromptFromFavorites = () => {
        // const dataToSend:Array<PromptFavoriteType> = [...favoritePrompts].filter(el => el.id !== favPromptId)
        // dispatch(postFavoritePromptsThunk(dataToSend));
        removeThisItemFromFavorite(props.elem.datetime);
    }
    const addPromptFromFavorites = () => {
        addToFavoriteThisHistoryItem(props.elem.datetime);
    } //setShowAddToFavorite(true)

    return <div className={s.bricksDivShort} onDoubleClick={() => setIsShort(!isShort)}>

        {/* { showAddToFavorite && <AddPromptToFavoriteWindow prompt={props.elem.prompt} setShow={setShowAddToFavorite}/> } */}

        <div className={s.oneSection}>
            {props.index + 1}
        </div>
        <div className={s.oneSection}>
            { props.elem.username}
        </div>
        <div className={s.oneSection}>
            {/* { props.elem.datetime } */}
            { dateAndTime }
        </div>
        <div className={s.oneSection}>
            { props.elem.company }
        </div>
        <div className={s.oneSection}>
            { promptView }
        </div>
        <div className={s.oneSection}>
            { responseView }
        </div>
        <div className={s.oneSection}>
            <img alt="" src={okIcon} className={s.iconsImg}
                onClick={onChooseBrickClickHandler}
                onMouseOver={() => dispatch(changeFooterHelpTextAC("Вставить данный промпт и ответ GPT вместо текущего"))}
                onMouseLeave={() => dispatch(changeFooterHelpTextAC(""))}
            />
        </div>
        <div className={s.oneSection}>
            {
                isThisPromptFavorite
                    ? <img alt="" src={starIconFilled} className={s.iconsImg}
                        onClick={removePromptFromFavorites}
                        onMouseOver={() => dispatch(changeFooterHelpTextAC("Добавить данную версию промпта в избранное"))}
                        onMouseLeave={() => dispatch(changeFooterHelpTextAC(""))}
                    />
                    : <img alt="" src={starIconEmpty} className={s.iconsImg}
                        onClick={addPromptFromFavorites}
                        onMouseOver={() => dispatch(changeFooterHelpTextAC("Исключить данную версию промпта из избранных"))}
                        onMouseLeave={() => dispatch(changeFooterHelpTextAC(""))}
                    />
            }
        </div>
        
    </div>
}

export default OneBrick;