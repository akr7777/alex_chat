import { ChangeEvent } from 'react';
import s from './multiline.module.css';

type MultilineTextPropsType = {
    value: string,
    onValuechange: (newValue: string) => void
}
const MultilineText = (props: MultilineTextPropsType) => {

    const onTextChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
        props.onValuechange(e.currentTarget.value)
    }

    return <textarea 
        value={props.value}
        onChange={(e) => onTextChangeHandler(e)}
        className={s.multiline}
        rows={10}
    />
}

export default MultilineText;