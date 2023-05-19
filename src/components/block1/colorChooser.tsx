import { useState } from "react";
import s from "./blockOne.module.css";
import { HexColorPicker } from "react-colorful";
import { RootState, useAppDispatch } from "../../store/store";
import { QuestionType, changeQuestionColorAC } from "../../store/features/questionSlice";
import { useSelector } from "react-redux";


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