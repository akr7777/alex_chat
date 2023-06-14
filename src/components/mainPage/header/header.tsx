import { useSelector } from "react-redux";
import s from "./header.module.css";
import UserName from "./userName";
import { RootState, useAppDispatch } from "../../../store/store";
import { LineTextField } from "../../../common/lineTextField/labelLineText";
import { useState } from "react";
import { changeFooterHelpTextAC, changeTitleAC } from "../../../store/features/questionSlice";
import ExportAndImport from "./exportAndImport";

import crossIcon from '../../../public/icons/cross_icon.png';
import okIcon from '../../../public/icons/ok_icon.png';

const Header = () => {
    const title: string = useSelector((state:RootState) => state.questions.title);
    const dispatch = useAppDispatch();
    const [newTitle, setNewTitle] = useState<string>(title);
    const [editTitle, setEditTitle] = useState<boolean>(false);

    const onChangeTitleOKClickHandler = () => {
        dispatch(changeTitleAC(newTitle))
        setEditTitle(false)
    }

    return <div className={s.headerDiv}>

        <ExportAndImport/>

        <div className={s.titleDiv}>
            {
                editTitle
                    ? <>
                        <LineTextField type={"text"} text={newTitle} onChangeFunction={(text: string) => setNewTitle(text)} />
                        
                        {/* <button onClick={() => {
                                dispatch(changeTitleAC(newTitle))
                                setEditTitle(false)
                            }}>OK</button> */}
                        <img alt="" src={okIcon} 
                            onClick={onChangeTitleOKClickHandler} 
                            className={s.iconImg}
                            onMouseOver={() => dispatch(changeFooterHelpTextAC("Подтвпердить изменение заголовка"))}
                            onMouseLeave={() => dispatch(changeFooterHelpTextAC(""))}
                        />
                        
                        <img alt="" src={crossIcon} 
                            onClick={ () => setEditTitle(false) } 
                            className={s.iconImg}
                            onMouseOver={() => dispatch(changeFooterHelpTextAC("Отменить изменение заголовка"))}
                            onMouseLeave={() => dispatch(changeFooterHelpTextAC(""))}
                        />
                        {/* <button onClick={() => setEditTitle(false)}>Cancel</button> */}
                    </>
                    : <div className={s.titleDiv}>
                        <h3 onClick={() => setEditTitle(true)}>{title}</h3>
                    </div>
            }
        </div>

        <UserName />

        
    </div>
}

export default Header;