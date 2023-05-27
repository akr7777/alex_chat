import { useState } from "react";
import s from "./bricks.module.css";
import { changeGPTResponseAC, changePromptAC, changeShowResponseHistoryAC } from "../../../../store/features/questionSlice";
import { RootState, useAppDispatch } from "../../../../store/store";
import okIcon from "./../../../../public/icons/ok_icon.png";
import { COMMON_DATE_TIME_FORMAT, NEW_LINE_SEPARATOR, SHORT_TEXT_LENGTH } from "../../../../functions/consts";
import { inputBracketsInText } from "../../../../functions/functions";
import { useSelector } from "react-redux";
import { HistoryType, QuestionType } from "../../../../store/features/questionTypes";
import dayjs from "dayjs";

type OneBrickPropsType = {
    elem: HistoryType,
    index: number
}

const OneBrick = (props: OneBrickPropsType) => {
    const dispatch = useAppDispatch();
    const [isShort, setIsShort] = useState<boolean>(true);
    const questions:Array<QuestionType> = useSelector((state:RootState) => state.questions.questions);
    const dateAndTime: string = dayjs(props.elem.datetime).format(COMMON_DATE_TIME_FORMAT)

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

    return <div className={s.bricksDivShort} onDoubleClick={() => setIsShort(!isShort)}>

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
            <img alt="" src={okIcon} onClick={onChooseBrickClickHandler} className={s.iconsImg}/>
        </div>
        
    </div>
}

export default OneBrick;