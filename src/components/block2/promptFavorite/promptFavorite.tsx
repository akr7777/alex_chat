import s from "./promptFavorite.module.css";

import crossIcon from "./../../../public/icons/cross_icon.png";
import { RootState, useAppDispatch } from "../../../store/store";
import { PromptFavoriteType, changeShowPromptFavoritesAC } from "../../../store/features/questionSlice";
import { useSelector } from "react-redux";
import OneFavoriteBrick from "./oneFavoriteBrick";

const PromptHistory = () => {
    const dispatch = useAppDispatch();

    const favoritesPrompts:Array<PromptFavoriteType> = useSelector((state: RootState) => state.questions.favoritesPrompts);


    const onPromptHistoryCloseClickHandler = () => {
        dispatch(changeShowPromptFavoritesAC(false))
    }

    return <div className={s.promptHistoryLayout}>
        <div className={s.promptHistoryDiv}>
            <img alt="" src={crossIcon} className={s.iconImg} onClick={onPromptHistoryCloseClickHandler}/>

            <h2>Избранные промпты:</h2>
            
            {
               favoritesPrompts.map(f => {
                    return <OneFavoriteBrick title={f.title} prompt={f.prompt}/>
               }) 
            }

        </div>
    </div>
}

export default PromptHistory;