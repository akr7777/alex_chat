import s from './calendar.module.css';
import iconNext from '../../public/calendar_icons/icon_next.png';
import iconPrev from '../../public/calendar_icons/icon_prev.png';

export type CalendarYearsPropsType = {
    date: Date;
    onDateChange: (newDate: Date) => void,
}
const calendarYears = (props: CalendarYearsPropsType) => {
    
    const currentYear = props.date.getFullYear();

    const onYearMinusClickHandler = () => {
        const newDate:Date = new Date(props.date.getFullYear() - 1, props.date.getMonth(), props.date.getDate());
        props.onDateChange( newDate )
    }
    const onYearPlusClickHandler = () => {
        const newDate:Date = new Date(props.date.getFullYear() + 1, props.date.getMonth(), props.date.getDate());

        props.onDateChange( newDate )
    }

    return <div className={s.calendar_head_year_div + " " + s.year_width}>
            <img alt="" src={iconPrev} className={s.arrows} onClick={onYearMinusClickHandler}/>
            {currentYear}
            <img alt="" src={iconNext} className={s.arrows} onClick={onYearPlusClickHandler}/>
        </div>
}

export default calendarYears;