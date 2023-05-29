import { useState } from "react";
import s from "./blockOne.module.css";
import { OneQuestionPropsType } from "./oneQuestion";
import { useAppDispatch } from "../../store/store";
import { changeQuestionAC, changeTwoQuestionsOrderAC, removeQuestionAC } from "../../store/features/questionSlice";
import MultilineText from "../../common/multilineText/multilineText";

import saveIcon from "./../../public/icons/save_icon.png";
import cancelIcon from "./../../public/icons/cancel_icon.png";
import removeIcon from "./../../public/icons/remove_icon_1.png";
import arrowUpIcon from "./../../public/icons/arrow_up.png";
import arrowDownIcon from "./../../public/icons/arrow_down.png";
import refreshIcon from "./../../public/icons/refresh_icon.png";

import { QuestionType } from "../../store/features/questionTypes";


const OneQuestionContent = (props: OneQuestionPropsType) => {

    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [isQuestionEdit, setIsQuestionEdit] = useState<boolean>(false);
    const [newQuestion, setNewQuestion] = useState<string>(props.elem.question);
    const [newAnswer, setNewAnswer] = useState<string>(props.elem.answer);
    const dispatch = useAppDispatch();
    
    const onSaveClickHandler = () => {
        const newElem: QuestionType = {
            ...props.elem, answer: newAnswer, question: newQuestion
        }
        dispatch(changeQuestionAC(newElem));
        setIsEdit(false);
        setIsQuestionEdit(false);
    }
    const onQuestionEditOnClickHandler = () => setIsQuestionEdit(true);
    const onCancelClickHandler = () => {
        setIsEdit(false);
        setIsQuestionEdit(false);
    }
    const onDivClickHandler = () => setIsEdit(true);
    const onQuestionUpClickHandler = () => dispatch(changeTwoQuestionsOrderAC(props.index - 1));
    const onQuestionDownClickHandler = () => dispatch(changeTwoQuestionsOrderAC(props.index));
    const onRemoveQuestionClickHandler = () => dispatch(removeQuestionAC(props.elem.id));


    return <div className={s.oneQuestionContent}>

        {
            isEdit && <div>
                { props.index < props.questionsLength - 1 && 
                    <img alt="" className={s.iconsImg} src={arrowDownIcon} onClick={onQuestionDownClickHandler} /> }
                
                <img alt="" className={s.iconsImg} src={removeIcon} onClick={onRemoveQuestionClickHandler} />
                
                { props.index > 0 &&
                    <img alt="" className={s.iconsImg} src={arrowUpIcon} onClick={onQuestionUpClickHandler} /> }
            </div>
        }

        <div className={s.questionTextLabel}>
            <div onClick={onDivClickHandler} className={s.divClick}>
                <strong>Вопрос №{props.index + 1} </strong>
                {/* <img alt="" className={s.iconsImg} src={saveIcon} /> */}
            </div>
            {/* OF {props.questionsLength} */}
        </div>

        {
            isQuestionEdit
                ? <div>
                    <MultilineText value={newQuestion} onValuechange={(newValue) => setNewQuestion(newValue)}/>
                    {/* {
                        isQuestionEdit 
                            ? <img alt="" className={s.iconsImg} src={refreshIcon} onClick={onQuestionEditOnClickHandler} />
                            : <></>
                    } */}
                </div>
                : <div className={s.questionTextLabel}>
                    <div onDoubleClick={isEdit ? onQuestionEditOnClickHandler : () => {}}>
                        { props.elem.question }
                    </div>
                    {/* <img alt="" className={s.iconsImg} src={refreshIcon} onClick={onQuestionEditOnClickHandler} /> */}
                </div>
        }
       
       <div className={s.questionTextLabel + " " + s.marginTop}>Ответ:</div>
       
        <div>
            {
                isEdit
                    ?   <MultilineText value={newAnswer} onValuechange={(newValue) => setNewAnswer(newValue)}/>
                    // :   <div className={s.answerTextLabel} onClick={onDivClickHandler}>
                    //             { props.elem.answer }
                    //     </div>
                    :   <div className={s.answerTextLabel}>
                                { props.elem.answer }
                        </div>
            }
        </div>

        {/* BUTTONS panel */}
        {
            isEdit && <div className={s.iconsDiv}>
                    <img alt="" className={s.iconsImg} src={saveIcon} onClick={onSaveClickHandler} />
                    <img alt="" className={s.iconsImg} src={cancelIcon} onClick={onCancelClickHandler} />
                </div>
        }
    </div>
}

export default OneQuestionContent
