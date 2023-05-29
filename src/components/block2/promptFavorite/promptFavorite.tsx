import s from "./promptFavorite.module.css";

import crossIcon from "./../../../public/icons/cross_icon.png";
import { RootState, useAppDispatch } from "../../../store/store";
import { changeShowPromptFavoritesAC } from "../../../store/features/questionSlice";
import { useSelector } from "react-redux";
import OneFavoriteBrick from "./oneFavoriteBrick";
import { PromptFavoriteType } from "../../../store/features/questionTypes";
import Preloader from "../../../common/preloader/preloader";
import { useEffect } from "react";
import { getFavoritePromptsThunk } from "../../../store/features/questionThunk";

const PromptHistory = () => {
    const dispatch = useAppDispatch();
    const favoritesPrompts:Array<PromptFavoriteType> = useSelector((state: RootState) => state.questions.favoritesPrompts);
    const isLoading: boolean = useSelector((state: RootState) => state.questions.varLoading.promptHistoryLoading);

    useEffect(() => {
        dispatch(getFavoritePromptsThunk())
    }, [])

    const onPromptHistoryCloseClickHandler = () => {
        dispatch(changeShowPromptFavoritesAC(false))
    }

    return <div className={s.promptHistoryLayout}>
        <div className={s.promptHistoryDiv}>
            <img alt="" src={crossIcon} className={s.iconImg} onClick={onPromptHistoryCloseClickHandler}/>

            <h2>Избранные промпты:</h2>

            {
                isLoading
                    ? <Preloader/>
                    : <>
                        {
                            favoritesPrompts.map((f:PromptFavoriteType, elemIndex: number) => {
                                    return <OneFavoriteBrick id={f.id} title={f.title} prompt={f.prompt} key={elemIndex}/>
                            }) 
                        }
                    </>
            }
            
        </div>
    </div>
}

export default PromptHistory;