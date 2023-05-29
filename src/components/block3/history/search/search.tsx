import { useSelector } from "react-redux";
import { LineTextField } from "../../../../common/lineTextField/labelLineText";
import s from "./search.module.css"
import { RootState, useAppDispatch } from "../../../../store/store";
import { changeSearchCompanyAC, changeSearchDateEndAC, changeSearchDateStartAC, changeSearchTextAC } from "../../../../store/features/questionSlice";

// import Calendar from "../../../../common/calendar/calendar";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import dayjs from "dayjs";
import { COMMON_DATE_FORMAT } from "../../../../functions/consts";

const Search = () => {
    const dispatch = useAppDispatch();
    const searchText: string = useSelector((state: RootState) => state.questions.var.searchText);
    const searchCompany: string = useSelector((state: RootState) => state.questions.var.searchCompany);
    // const searchDateStart: string = useSelector((state: RootState) => state.questions.var.searchDateStart);
    // const searchDateEnd: string = useSelector((state: RootState) => state.questions.var.searchDateEnd);

    const onSearchTextChangedHandler = (newVal: string) => {
        dispatch(changeSearchTextAC(newVal));
    }
    const onSearchCompanyChangedHandler = (newVal: string) => {
        dispatch(changeSearchCompanyAC(newVal));
    }

    const startDateStr: string = useSelector((state: RootState) => state.questions.var.searchDateStart);
    const endDateStr: string = useSelector((state: RootState) => state.questions.var.searchDateEnd);


    let startDateDate: Date | null;
    let endDateDate: Date | null;
    try {
        startDateDate = startDateStr.length > 0
            ? new Date(dayjs(startDateStr).year(), dayjs(startDateStr).month(), dayjs(startDateStr).date())
            : null;

        endDateDate = endDateStr.length > 0
            ? new Date(dayjs(endDateStr).year(), dayjs(endDateStr).month(), dayjs(endDateStr).date()) 
            : null;
    } catch {
        startDateDate = null;
        endDateDate = null;
    }
    

    const onDateStartChangeClickHandler = (newDate: Date | null) => {
        if (newDate) {
            const newValue: string = dayjs(newDate).format(COMMON_DATE_FORMAT);
            dispatch(changeSearchDateStartAC(newValue)); 
        } else  {
            dispatch(changeSearchDateStartAC(''))
        }
        
    }
    const onDateEndChangeClickHandler = (newDate: Date | null) => { 
        if (newDate) {
            const newValue: string = dayjs(newDate).format(COMMON_DATE_FORMAT);
            dispatch(changeSearchDateEndAC(newValue)); 
        } else  {
            dispatch(changeSearchDateEndAC(''))
        }
        
    }

    return <div className={s.search}>

        {/* <div className={s.searchField + " " + s.searchMarginTop}>
            
        </div> */}

        <div className={s.searchField + " " + s.searchMarginTop}>
            <div>
                <label>Поиск по дате:</label>
                <div className={s.searchField}>
                    {/* https://reactdatepicker.com */}
                    <DatePicker 
                        // showIcon
                        dateFormat="dd.MM.yyyy"
                        selected={startDateDate} 
                        onChange={(date:Date) => onDateStartChangeClickHandler(date)} 
                        className={s.datePicker}
                    />
                    -
                    <DatePicker 
                        // showIcon
                        dateFormat="dd.MM.yyyy"
                        selected={endDateDate} 
                        onChange={(date:Date) => onDateEndChangeClickHandler(date)}
                        className={s.datePicker}
                    />
                    {/* </DatePicker> */}
                    {/* <DatePicker onChange={(date:Date) => setStartDate(date)} /> */}

                    {/* <Calendar onDateChange={(newValue: string) => onDateStartChangeClickHandler(newValue)} />
                    -
                    <Calendar onDateChange={(newValue: string) => onDateEndChangeClickHandler(newValue)} /> */}
                </div>
            </div>
            <div>
                <label>Поиск по Компании:</label>
                <LineTextField 
                    type="text"
                    text={searchCompany}
                    onChangeFunction={(val: string) => onSearchCompanyChangedHandler(val)}
                    className={s.textFieldWidth}
                />  
            </div>

            <div>
                <label>Поиск по тексту:</label>
                <LineTextField 
                    type="text"
                    text={searchText}
                    onChangeFunction={(val: string) => onSearchTextChangedHandler(val)}
                    className={s.textFieldWidth}
                />  
            </div>
            
        </div>

        
    </div>
}

export default Search;