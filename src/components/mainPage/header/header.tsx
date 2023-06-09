import { useSelector } from "react-redux";
import s from "./header.module.css";
import UserName from "./userName";
import { RootState, useAppDispatch } from "../../../store/store";
import { LineTextField } from "../../../common/lineTextField/labelLineText";
import { useState } from "react";
import { changeAllQustionsListAC, changePromptAC, changeTitleAC } from "../../../store/features/questionSlice";
import ExportAndImport from "./exportAndImport";

const Header = () => {
    const title: string = useSelector((state:RootState) => state.questions.title);
    // const prompt = useSelector((state:RootState) => state.questions.prompt);
    // const questions = useSelector((state:RootState) => state.questions.questions);
    
    const dispatch = useAppDispatch();
    const [newTitle, setNewTitle] = useState<string>(title);
    const [editTitle, setEditTitle] = useState<boolean>(false);

    
    

    return <div className={s.headerDiv}>

        <ExportAndImport/>

        <div className={s.titleDiv}>
            {/* {title} */}
            {
                editTitle
                    ? <>
                        <LineTextField type={"text"} text={newTitle} onChangeFunction={(text: string) => setNewTitle(text)} />
                        <button onClick={() => {
                                dispatch(changeTitleAC(newTitle))
                                setEditTitle(false)
                            }}>OK</button>
                        <button onClick={() => setEditTitle(false)}>Cancel</button>
                    </>
                    : <>
                        <h3 onClick={() => setEditTitle(true)}>{title}</h3>
                    </>
            }
        </div>

        <UserName />

        
    </div>
}

export default Header;