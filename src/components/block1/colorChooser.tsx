import s from "./blockOne.module.css";
import { HexColorPicker } from "react-colorful";
import { RootState, useAppDispatch } from "../../store/store";
import { changeQuestionColorAC } from "../../store/features/questionSlice";
import { useSelector } from "react-redux";
import { QuestionType } from "../../store/features/questionTypes";


type ColorChooserPropsType = {
    questionId: string
}
const ColorChooser = (props: ColorChooserPropsType) => {
    const dispatch = useAppDispatch();
    const questions: Array<QuestionType> = useSelector((state: RootState) => state.questions.questions);
    const color: string | undefined = questions.find(el => el.id === props.questionId)?.color;

    const onColorChangedHandler = (newColor: string) => {
        const dataToSend = {questionId: props.questionId, newColor: newColor } 
        dispatch(changeQuestionColorAC(dataToSend));
    }

    return <HexColorPicker color={color} onChange={(newColor: string) => onColorChangedHandler(newColor)} className={s.colorChooser}/>;
}

export default ColorChooser;