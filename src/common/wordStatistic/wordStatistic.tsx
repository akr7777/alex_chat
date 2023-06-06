import { useState } from "react";
import { changeFooterHelpTextAC } from "../../store/features/questionSlice";
import { useAppDispatch } from "../../store/store";
import s from "./stat.module.css";

import hideIcon from "../../public/icons/arrow_circle_up.png";
import showIcon from "../../public/icons/arrow_circle_down.png";
import { lettersCountWithSpaces, lettersCountWithoutSpaces, paragraphsCount, wordsCountWithoutSpaces } from "./wordFunctions";

type WordStatisticPropsType = {
    text: string
}

const WordStatistic = (props: WordStatisticPropsType) => {
    const dispatch = useAppDispatch();
    const [show, setShow] = useState<boolean>(false);

    return <div className={s.wrapper}>
        <div className={s.titleDiv}>
            <>Статистика:</>
            {
                show
                    ? <img 
                        alt="Развернуть статистику" src={hideIcon} className={s.icons} 
                        onClick={() => setShow(false)}
                        onMouseOver={() => dispatch(changeFooterHelpTextAC("Развернуть статистику"))}
                        onMouseLeave={() => dispatch(changeFooterHelpTextAC(""))}
                    />
                    : <img 
                        alt="Развернуть статистику" src={showIcon} className={s.icons} 
                        onClick={() => setShow(true)}
                        onMouseOver={() => dispatch(changeFooterHelpTextAC("Развернуть статистику"))}
                        onMouseLeave={() => dispatch(changeFooterHelpTextAC(""))}
                    />
            }
        </div>

        {
            show && <div className={s.statBody}>
                <div className={s.oneBodysection}>
                    Количество знаков (с пробелами):   
                    &nbsp;
                    {lettersCountWithSpaces(props.text)}
                </div>
                <div className={s.oneBodysection}>
                    Количество знаков (без пробелов):
                    &nbsp;
                    {lettersCountWithoutSpaces(props.text)}
                </div>
                <div className={s.oneBodysection}>
                    Количество слов:
                    &nbsp;
                    {wordsCountWithoutSpaces(props.text)}
                </div>
                <div className={s.oneBodysection}>
                    Количество абзацев:
                    &nbsp;
                    {paragraphsCount(props.text)}
                </div>
            </div>
        }
    </div>
}

export default WordStatistic;