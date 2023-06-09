import { changeFooterHelpTextAC } from "../../store/features/questionSlice";
import { useAppDispatch } from "../../store/store";
import s from "./button.module.css";

type ButtonOnePropsType = {
    text: string,
    onClickFunction: () => void
    isDisabled?: boolean
    helpText?: string
}
export const ButtonOne = (props: ButtonOnePropsType) => {
    const dispatch = useAppDispatch();
    
    return <button 
        className={ props.isDisabled 
                        ? s.buttonOneCss + " " + s.buttonOneCssDisabled 
                        : s.buttonOneCss
                    }
        onClick={() => props.onClickFunction()}
        onMouseOver={() => dispatch(changeFooterHelpTextAC(props.helpText || ""))}
        onMouseLeave={() => dispatch(changeFooterHelpTextAC(""))}
        disabled={props.isDisabled}
    >
        {props.text}
    </button>
}

type LabelForPropsType = {
    forWhat: string
    text: string
    helpText?: string
    isDisabled?: boolean
}
export const LabelFor = (props: LabelForPropsType) => {
    const dispatch = useAppDispatch();

    return <label 
        htmlFor={props.forWhat} 
        className={ props.isDisabled 
            ? s.buttonOneCss + " " + s.buttonOneCssDisabled 
            : s.buttonOneCss
        }
        onMouseOver={() => dispatch(changeFooterHelpTextAC(props.helpText || ""))}
        onMouseLeave={() => dispatch(changeFooterHelpTextAC(""))}
        // disabled={props.isDisabled}

    >
        {props.text}
    </label>
} 