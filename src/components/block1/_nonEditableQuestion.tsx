import { useSelector } from "react-redux";
import { QuestionType } from "../../store/features/questionSlice";
import { RootState, useAppDispatch } from "../../store/store";
import s from './blockOne.module.css';
import sphereIcon from "./../../public/icons/sphere_icon.png";


type NonEditableQuestionPropsType = {
    index: number,
    elem: QuestionType
}
const NonEditableQuestion = (props: NonEditableQuestionPropsType) => {
    const dispatch = useAppDispatch();
    const changedIdsList: Array<string> = useSelector((state: RootState) => state.questions.changedIdsList);

    const onQuestionClickHandler = () => {
        // dispatch(changeEditableIdAC(props.elem.id));
    }

    return <div className={s.oneQuestion + " " + s.oneQuestionNonEditable} onClick={onQuestionClickHandler}>
        <div className={s.oneQuestionTitleDiv}>
            {
                changedIdsList.some(someId => someId === props.elem.id) &&
                    <img alt="" src={sphereIcon} className={s.oneQuestionTitleSphereImg}/>
            }
            <strong>Вопрос №{props.index + 1}</strong>
        </div>
            {props.elem.question}
        <strong>
            {props.elem.answer}
        </strong>
    </div>
}

export default NonEditableQuestion;