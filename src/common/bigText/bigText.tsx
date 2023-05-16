import s from "./bigText.module.css";

type BigTextPropsType = {
    value: string,
    onValueChange: (newValue: string) => void
}
const BigText = (props: BigTextPropsType) => {
    return <textarea 
        defaultValue={props.value}
        className={s.textareaCSS} 
        onChange={(e) => props.onValueChange(e.currentTarget.value)}
    />
}

export default BigText;