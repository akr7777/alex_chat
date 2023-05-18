import { useState } from "react";
import s from "./blockOne.module.css";
import { HexColorPicker } from "react-colorful";
import { useAppDispatch } from "../../store/store";
import { changeQuestionColorAC } from "../../store/features/questionSlice";


type ColorChooserPropsType = {
    questionId: string
}
const ColorChooser = (props: ColorChooserPropsType) => {
    const dispatch = useAppDispatch();
    const [color, setColor] = useState("#aabbcc");

    const onColorChangedHandler = (newColor: string) => {
        const dataToSend = {questionId: props.questionId, newColor: newColor } 
        dispatch(changeQuestionColorAC(dataToSend));
        setColor(newColor);
    }

    return <HexColorPicker color={color} onChange={(newColor: string) => onColorChangedHandler(newColor)} className={s.colorChooser}/>;
}

export default ColorChooser;