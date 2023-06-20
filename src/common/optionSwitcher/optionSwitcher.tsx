import { ChangeEvent } from 'react';
import s from './optionSwitcher.module.css';

type OneOptionType = {
    text: string,
    value: string
}
type OptionSwitcherPropsType = {
    options: Array<OneOptionType>
    checkedOption?: string
    onChangeFunction: (newValue: string) => void
}
const OptionSwitcher = (props: OptionSwitcherPropsType) => {

    const onSelectValueChange = (e: ChangeEvent<HTMLSelectElement>) => {
        props.onChangeFunction(e.currentTarget.value);
    }

    return <select 
                // name="choice" 
                // defaultValue={props.checkedOption}
                value={props.checkedOption}
                className={s.switcher}
                onChange={(e) => onSelectValueChange(e)}
            >
        {
            props.options.map((o:OneOptionType, index: number) => {
                return <option value={o.value} key={index}>
                    {o.text}
                </option>
            })
        }
    </select>
}

export default OptionSwitcher;