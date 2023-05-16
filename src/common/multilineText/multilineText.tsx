import { ChangeEvent } from 'react';
import s from './multiline.module.css';

type MultilineTextPropsType = {
    value: string,
    onValuechange: (newValue: string) => void,

    rows?: number,
    cols?: number
}
const MultilineText = (props: MultilineTextPropsType) => {

    const onTextChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
        props.onValuechange(e.currentTarget.value)
    }

    return <textarea 
        value={props.value}
        onChange={(e) => onTextChangeHandler(e)}
        className={s.multiline}
        rows={ props.rows ? props.rows : 10 }
        cols={ props.cols ? props.cols : 5 }
    />
}

export default MultilineText;