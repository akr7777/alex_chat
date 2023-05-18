import s from "./blockThree.module.css";

import crossIcon from './../../public/icons/cross_icon.png';

type HistoryResponsesPropsType = {
    show: boolean,
    setShow: (val: boolean) => void
}

const HistoryResponses = (props: HistoryResponsesPropsType) => {
    return <div 
                className={
                    props.show
                        ? s.historyLayoutDiv + " " + s.showHistoryLayout
                        : s.historyLayoutDiv
                } 
            >
        
        <img 
            alt="" 
            className={s.iconsImg + " " + s.crossIcon} 
            src={crossIcon} 
            onClick={() => props.setShow(false)} 
        />
        <div className={s.hystoryDiv}>

        </div>

    </div>
}

export default HistoryResponses;