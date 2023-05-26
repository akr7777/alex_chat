import { useSelector } from "react-redux";
import { LineTextField } from "../../../../common/lineTextField/labelLineText";
import s from "./search.module.css"
import { RootState, useAppDispatch } from "../../../../store/store";
import { changeSearchCompanyAC, changeSearchDateEndAC, changeSearchDateStartAC, changeSearchTextAC } from "../../../../store/features/questionSlice";
import Calendar from "../../../../common/calendar/calendar";

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

    const onDateStartChangeClickHandler = (newValue: string) => {
        console.log('newValue=', newValue);
        
        dispatch(changeSearchDateStartAC(newValue));
    }
    const onDateEndChangeClickHandler = (newValue: string) => {
        dispatch(changeSearchDateEndAC(newValue));
    }

    return <div className={s.search}>

        <div className={s.searchField + " " + s.searchMarginTop}>
            {/* <label>Поиск по дате:</label>
            <Calendar onDateChange={(newValue: string) => onDateStartChangeClickHandler(newValue)} />
            -
            <Calendar onDateChange={(newValue: string) => onDateEndChangeClickHandler(newValue)} /> */}

            {/* <LineTextField 
                type="text"
                text=""
                onChangeFunction={() => {}}
            />
            -
            <LineTextField 
                type="text"
                text=""
                onChangeFunction={() => {}}
            /> */}
        </div>

        <div className={s.searchField + " " + s.searchMarginTop}>
            <div>
                <label>Поиск по дате:</label>
                <div className={s.searchField}>
                    <Calendar onDateChange={(newValue: string) => onDateStartChangeClickHandler(newValue)} />
                    -
                    <Calendar onDateChange={(newValue: string) => onDateEndChangeClickHandler(newValue)} />
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