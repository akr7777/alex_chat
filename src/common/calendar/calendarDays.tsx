import { useSelector } from 'react-redux';
// import { EN_LANG, RU_LANG, UserLangType } from '../../../store/features/authSlice';
// import { RootState } from '../../../store/store';
import s from './calendar.module.css';

const weekRu = ['П', 'В', 'C', 'Ч', 'П', 'C', 'В'];
const weekEn = ['M', "T", "W", "T", "F", "S", "S"];

export type CalendarDaysPropsType = {
    chosenDate: Date,
    newDate: Date,
    onDateChange: (newDate: Date) => void,
}
function daysCountinMonth(date: Date) {
    return 32 - new Date(date.getFullYear(), date.getMonth(), 32).getDate();
}
function numberCountArray(n: number):Array<number> {
    const arr:Array<number> = [];
    let count:number = n;
    if (count === -1)
        count = 6;
    for (let i=1; i<=count; i++)
        arr.push(i);
    return arr;
}


const CalendarDays = (props: CalendarDaysPropsType) => {
    const daysCountArr:Array<number> = numberCountArray(daysCountinMonth(props.newDate));

    const currentDayOfWeekArr:Array<number> = numberCountArray(new Date(props.newDate.getFullYear(), props.newDate.getMonth(), 1).getDay() - 1);

    const onDayClickHandler = (chosenDay: number) => {
        const newDate:Date = new Date(props.newDate.getFullYear(), props.newDate.getMonth(), chosenDay);
        props.onDateChange(newDate);
    }

    const markedDayCondition = (day: number):boolean => {
        return props.chosenDate.toLocaleDateString() === new Date(props.newDate.getFullYear(), props.newDate.getMonth(), day).toLocaleDateString()
            ?  true : false
    } 

    // const lang:UserLangType = useSelector((state: RootState) => state.auth.userSettings.language);
    
    const daysOfWeek = weekRu;
    // const daysOfWeek = (lang === EN_LANG) 
    //                         ? weekEn 
    //                         : (lang === RU_LANG) 
    //                             ? weekRu
    //                             : []

    return <>
        <div className={s.calendar_head_days_div + " " + s.days_width}>
           
            <div className={s.calendar_days_fields_div}>
                {
                    daysOfWeek.map((el:string, i:number) => <label key={"letter_"+i} className={s.td_tr}>{el}</label>)
                }
                {
                    currentDayOfWeekArr.map((el:number,i:number) => <label key={"empty_"+el} className={s.td_tr}></label>)
                }
                {
                    daysCountArr.map( (d:number, i:number) => {
                        return <div 
                                    key={'day_'+i}
                                    className={
                                        markedDayCondition(d)
                                            ? s.calendar_oneDayField + " " + s.calendar_oneDayField_checked
                                            : s.calendar_oneDayField
                                    }
                                    onClick={() => onDayClickHandler(d)}
                                >
                            {d}
                        </div>
                    })
                }

            </div>
           
        </div>
    </>
}

export default CalendarDays;