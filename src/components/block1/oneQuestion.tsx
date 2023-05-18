import { useState } from "react";
import { QuestionType } from "../../store/features/questionSlice";
import s from "./blockOne.module.css";
import OneQuestionContent from "./oneQuestionContent";
import ColorChooser from "./colorChooser";

export type OneQuestionPropsType = {
    index: number,
    elem: QuestionType
}

const OneQuestion = (props: OneQuestionPropsType) => {
    const [editColor, setEditColor] = useState<boolean>(false);

    return <div className={s.oneQuestion}>
        <div 
            className={s.colorDiv}
            onClick={() => setEditColor(!editColor)} 
            style={ { backgroundColor: props.elem.color } }
        /> 
        {
            editColor 
                ? <ColorChooser questionId={props.elem.id}/>
                : <OneQuestionContent index={props.index} elem={props.elem}/>
        }
    </div>
}

export default OneQuestion;