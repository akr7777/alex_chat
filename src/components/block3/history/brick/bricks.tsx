import { useSelector } from 'react-redux';
import { HistoryType } from '../../../../store/features/questionTypes';
import s from './bricks.module.css';
// import s from "./../../../../common/brickCSS/bricks.module.css";
import { RootState, useAppDispatch } from '../../../../store/store';
import OneBrick from './oneBrick';
import { useEffect } from 'react';
import { getResponseHistoryThunk } from '../../../../store/features/questionThunk';
import Preloader from '../../../../common/preloader/preloader';
import dayjs from 'dayjs';

const Bricks = () => {

    const dispatch = useAppDispatch();
    let history:Array<HistoryType> = useSelector((state: RootState) => state.questions.responseHistory);
    if (history.length > 0)
        history = [...history].sort( (a,b) => {
            const a1 = dayjs(a.datetime).format("YYYY-MM-DD.HH:mm");
            const b1 = dayjs(b.datetime).format("YYYY-MM-DD.HH:mm")
            if (a1 < b1)
                return 1;
            else if (a1 > b1)
                return -1;
            else 
                return 0;
        });

    useEffect(() => {
        dispatch(getResponseHistoryThunk());
    }, [])

    const searchText: string = useSelector((state: RootState) => state.questions.var.searchText);
    const searchCompany: string = useSelector((state: RootState) => state.questions.var.searchCompany);
    const searchDateStart: string = useSelector((state: RootState) => state.questions.var.searchDateStart);
    const searchDateEnd: string = useSelector((state: RootState) => state.questions.var.searchDateEnd);

    const isLoading: boolean = useSelector((state: RootState) => state.questions.varLoading.responseHistoryLoading);

    if (searchText.length > 0) {
        history = history.filter(el => el.gpt_response.includes(searchText) || el.prompt.includes(searchText));
    }
    if (searchCompany.length > 0) {
        history = history.filter(el => el.company.includes(searchCompany));
    }
    if (searchDateStart.length > 0) {
        history = history.filter(el => el.datetime >= searchDateStart.replaceAll('-', '.'));
    }
    if (searchDateEnd.length > 0) {
        history = history.filter(el => el.datetime <= searchDateEnd.replaceAll('-', '.'));
    }

    return <div className={s.bricks}>

        <div className={s.bricksHead}>
            <label>N</label>
            <label>User</label>
            <label>Дата</label>
            <label>Заказчик</label>
            <label>Промпт</label>
            <label>Ответ GPT</label>
            <label>+</label>
        </div>

        {
            isLoading
                ? <Preloader />
                : <>
                    {
                        history.map( (elem, elemIndex) => {
                          return <OneBrick elem={elem} index={elemIndex} key={elemIndex}/>
                        })
                    }
                </>
        }

    </div>
}

export default Bricks;