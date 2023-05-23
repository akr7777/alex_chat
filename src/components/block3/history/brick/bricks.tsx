import { useSelector } from 'react-redux';
import { HistoryType } from '../../../../store/features/questionSlice';
import s from './bricks.module.css';
// import s from "./../../../../common/brickCSS/bricks.module.css";
import { RootState, useAppDispatch } from '../../../../store/store';
import OneBrick from './oneBrick';
import { useEffect } from 'react';
import { getHistoryThunk } from '../../../../store/features/questionThunk';

const Bricks = () => {

    const dispatch = useAppDispatch();
    let history:Array<HistoryType> = useSelector((state: RootState) => state.questions.history);

    useEffect(() => {
        dispatch(getHistoryThunk());
    }, [])

    const searchText: string = useSelector((state: RootState) => state.questions.var.searchText);
    const searchCompany: string = useSelector((state: RootState) => state.questions.var.searchCompany);
    const searchDateStart: string = useSelector((state: RootState) => state.questions.var.searchDateStart);
    const searchDateEnd: string = useSelector((state: RootState) => state.questions.var.searchDateEnd);

    if (searchText.length > 0) {
        history = history.filter(el => el.answer.includes(searchText) || el.prompt.includes(searchText));
    }
    if (searchCompany.length > 0) {
        history = history.filter(el => el.company.includes(searchCompany));
    }
    if (searchDateStart.length > 0) {
        history = history.filter(el => el.date >= searchDateStart.replaceAll('-', '.'));
    }
    if (searchDateEnd.length > 0) {
        history = history.filter(el => el.date <= searchDateEnd.replaceAll('-', '.'));
    }

    return <div className={s.bricks}>

        <div className={s.bricksHead}>
            <label>N</label>
            <label>User</label>
            <label>Дата</label>
            <label>Заказчик</label>
            <label>Начало промпта</label>
            <label>начало ОТВЕТА ИИ</label>
            <label>+</label>
            {/* N / user / Дата / Заказчик / Начало промпта / начало ОТВЕТА ИИ / Выбрать*/}
        </div>

        {
            history.map( (elem, elemIndex) => {
                return <OneBrick elem={elem} index={elemIndex} key={elemIndex}/>
            })
        }

    </div>
}

export default Bricks;