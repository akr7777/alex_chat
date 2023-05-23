import s from './calendar.module.css';
import iconNext from '../../public/calendar_icons/icon_next.png';
import iconPrev from '../../public/calendar_icons/icon_prev.png';
import { CURRENT_LANG } from './calendar';
// import { useSelector } from 'react-redux';
// import { RootState } from '../../../store/store';
// import { UserLangType } from '../../../store/features/authSlice';


export type CalendarMonthsPropsType = {
    date: Date;
    onDateChange: (newDate: Date) => void,
}
const CalendarMonths = (props: CalendarMonthsPropsType) => {

    // const currentLang:UserLangType = useSelector((state:RootState) => state.auth.userSettings.language);
    const currentLang = CURRENT_LANG;
    const fullMonth = props.date.toLocaleString(currentLang, {month: 'long'});

    const onMonthMinusClickHandler = () => {
        const newDate:Date = new Date(props.date.getFullYear(), props.date.getMonth() - 1, props.date.getDate());
        props.onDateChange( newDate )
    }
    const onMonthPlusClickHandler = () => {
        const newDate:Date = new Date(props.date.getFullYear(), props.date.getMonth() + 1, props.date.getDate());
        props.onDateChange( newDate )
    }

    return <>
        <div className={s.calendar_head_month_div + " " + s.month_width}>
            <img src={iconPrev} className={s.arrows} onClick={onMonthMinusClickHandler} alt=""/>
            {fullMonth}
            <img src={iconNext} className={s.arrows} onClick={onMonthPlusClickHandler} alt=""/>
        </div>
    </>
}

export default CalendarMonths;