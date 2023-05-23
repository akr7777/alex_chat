import s from "./history.module.css";

import crossIcon from './../../../public/icons/cross_icon.png';
import Search from "./search/search";
import Bricks from "./brick/bricks";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../../store/store";
import { changeShowResponseHistoryAC } from "../../../store/features/questionSlice";

const HistoryResponses = () => {
    const dispatch = useAppDispatch();
    const showResponseHistory: boolean = useSelector((state: RootState) => state.questions.var.showResponseHistory);
    const onCloseHistoryClickHandler = () => dispatch(changeShowResponseHistoryAC(false));

    return <div 
                className={
                    showResponseHistory
                        ? s.historyLayoutDiv + " " + s.showHistoryLayout
                        : s.historyLayoutDiv
                } 
            >
        
        <img 
            alt="" 
            className={s.iconsImg + " " + s.crossIcon} 
            src={crossIcon} 
            onClick={onCloseHistoryClickHandler} 
        />

        <div className={s.hystoryDiv}>
            <Search />
            <Bricks />
        </div>

    </div>
}

export default HistoryResponses;