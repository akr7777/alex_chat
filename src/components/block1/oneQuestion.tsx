import { useState } from "react";
import { QuestionType, changeQuestionAC } from "../../store/features/questionSlice";
import s from "./blockOne.module.css";
import MultilineText from "../../common/multilineText/multilineText";
import { useAppDispatch } from "../../store/store";

import saveIcon from "./../../public/icons/save_icon.png";
import cancelIcon from "./../../public/icons/cancel_icon.png";


type OneQuestionPropsType = {
    index: number,
    elem: QuestionType
}

const OneQuestion = (props: OneQuestionPropsType) => {

    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [newAnswer, setNewAnswer] = useState<string>(props.elem.answer);
    const dispatch = useAppDispatch();

    const onSaveClickHandler = () => {
        const newElem: QuestionType = {
            ...props.elem, answer: newAnswer
        }
        dispatch(changeQuestionAC(newElem));
        setIsEdit(false);
    }
    const onCancelClickHandler = () => {
        setIsEdit(false);

    }
    const onDivClickHandler = () => {
        setIsEdit(true);
    }

    return <div className={s.oneQuestion}>

        <div className={s.questionTextLabel}>
            Вопрос №{props.index}
        </div>

        <div className={s.questionTextLabel}>
            { props.elem.question}
        </div>

        <div>
            {
                isEdit
                    ?   <MultilineText value={newAnswer} onValuechange={(newValue) => setNewAnswer(newValue)}/>
                    :   <label className={s.answerTextLabel} onClick={onDivClickHandler}>
                            { props.elem.answer }
                        </label>
            }
        </div>

        {
            isEdit && <div className={s.iconsDiv}>
                    <img alt="" className={s.iconsImg} src={saveIcon} onClick={onSaveClickHandler} />
                    <img alt="" className={s.iconsImg} src={cancelIcon} onClick={onCancelClickHandler} />
                </div>
        }
        
    </div>
}

export default OneQuestion;