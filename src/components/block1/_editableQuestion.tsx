import saveIcon from './../../public/icons/save_icon.png';
import cancelIcon from './../../public/icons/cancel_icon.png';
import removeIcon from './../../public/icons/remove_icon_1.png';
import arrowDownIcon from "./../../public/icons/arrow_down.png";
import arrowUpIcon from "./../../public/icons/arrow_up.png";
import sphereIcon from "./../../public/icons/sphere_icon.png";
import { QuestionType, addIdToChangedIdsListAC, changeQuestionAC } from '../../store/features/questionSlice';
import { RootState, useAppDispatch } from '../../store/store';
import s from './blockOne.module.css';
import MultilineText from '../../common/multilineText/multilineText';
import { useState } from 'react';
import { useSelector } from 'react-redux';

type EditableQuestionPropsType = {
    index: number
    elem: QuestionType
}
const EditableQuestion = (props: EditableQuestionPropsType) => {

    const dispatch = useAppDispatch();

    const changedIdsList: Array<string> = useSelector((state: RootState) => state.questions.changedIdsList);

    const [newQuestionText, setNewQuestionText] = useState<string>(props.elem.question);
    const [newAnswerText, setNewAnswerText] = useState<string>(props.elem.answer);

    const onSaveClickHandler = () => {
        // const newElemValue:QuestionType = {
        //     id: props.elem.id,
        //     question: newQuestionText,
        //     answer: newAnswerText
        // }
        // dispatch(changeQuestionAC(newElemValue))
        // dispatch(addIdToChangedIdsListAC(props.elem.id));
        // dispatch(changeEditableIdAC(''));
    }
    const onCancelClickHandler = () => {
        // dispatch(changeEditableIdAC(''));
    }
    const onRemoveClickHandler = () => {
        // dispatch(removeQuestionAC(props.elem.id));
    }

    return <div className={s.oneQuestion}>
        <div className={s.iconsDiv}>
            <img alt="" className={s.iconsImg} src={arrowDownIcon} />
            <img alt="" className={s.iconsImg} src={removeIcon} onClick={onRemoveClickHandler}/>
            <img alt="" className={s.iconsImg} src={arrowUpIcon} />

        </div>

        <div className={s.oneQuestionTitleDiv}>
            {
                changedIdsList.some(someId => someId === props.elem.id) &&
                    <img alt="" src={sphereIcon} className={s.oneQuestionTitleSphereImg}/>
            }
            <strong>Вопрос №{props.index + 1}</strong>
        </div>
            
            
        Вопрос:
        <MultilineText 
            value={newQuestionText}
            onValuechange={(newValue: string) => setNewQuestionText(newValue)}
        />
        Ответ:
        <MultilineText 
            value={newAnswerText}
            onValuechange={(newValue: string) => setNewAnswerText(newValue)}
        />

        <div className={s.iconsDiv}>
            <img className={s.iconsImg} alt="" src={saveIcon} onClick={onSaveClickHandler}/>
            <img className={s.iconsImg} alt="" src={cancelIcon} onClick={onCancelClickHandler} />
        </div>
    </div>
}

export default EditableQuestion;