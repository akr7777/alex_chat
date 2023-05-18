import { useState } from "react";
import s from "./blockOne.module.css";
import { OneQuestionPropsType } from "./oneQuestion";
import { useAppDispatch } from "../../store/store";
import { QuestionType, changeQuestionAC } from "../../store/features/questionSlice";
import MultilineText from "../../common/multilineText/multilineText";

import saveIcon from "./../../public/icons/save_icon.png";
import cancelIcon from "./../../public/icons/cancel_icon.png";


const OneQuestionContent = (props: OneQuestionPropsType) => {

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


    return <div className={s.oneQuestionContent}>

    <div className={s.questionTextLabel}>
        Вопрос №{props.index + 1}
    </div>

    <div className={s.questionTextLabel}>
        { props.elem.question}
    </div>

    <div>
        {
            isEdit
                ?   <MultilineText value={newAnswer} onValuechange={(newValue) => setNewAnswer(newValue)}/>
                :   <div className={s.answerTextLabel} onClick={onDivClickHandler}>
                            { props.elem.answer }
                    </div>
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

export default OneQuestionContent