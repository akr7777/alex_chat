import { useSelector } from "react-redux";
import s from "./header.module.css";
import UserName from "./userName";
import { RootState, useAppDispatch } from "../../../store/store";
import * as fs from "fs"
import { LineTextField } from "../../../common/lineTextField/labelLineText";
import { useState } from "react";
import { changeAllQustionsListAC, changePromptAC, changeTitleAC } from "../../../store/features/questionSlice";

const Header = () => {
    const title: string = useSelector((state:RootState) => state.questions.title);
    const prompt = useSelector((state:RootState) => state.questions.prompt);
    const questions = useSelector((state:RootState) => state.questions.questions);
    
    const dispatch = useAppDispatch();
    const [saveFileName, setSaveFileName] = useState<string>('');
    const [newTitle, setNewTitle] = useState<string>(title);
    const [editTitle, setEditTitle] = useState<boolean>(false);

    const exportToFile = () => {
        const FileSaver = require('file-saver');
        const exportData = {
            "title": title,
            "prompt": prompt,
            "questions": questions
        }
        // const blob = new Blob(["Hello, world!"], {type: "text/plain;charset=utf-8"});
        // FileSaver.saveAs(blob, "hello world.txt");
        // const fileName = file.target.files[0].name || '111.txt';
        const blob = new Blob([JSON.stringify(exportData)], {type: "text/plain;charset=utf-8"});
        FileSaver.saveAs(blob, saveFileName);
    }

    const importFromFile = async (file:any) => {
        let reader = new FileReader();
        reader.readAsText(file.target.files[0]);

        reader.onload = function() {
            const newData = JSON.parse(reader.result?.toString() || "");
            if (newData) {
                dispatch(changeTitleAC(newData.title));
                dispatch(changePromptAC(newData.prompt));
                dispatch(changeAllQustionsListAC(newData.questions));
            }
          };
        
        reader.onerror = function() {
            console.log("ERROR:", reader.error);
        };
    }

    return <div className={s.headerDiv}>
        <label>import</label>
        <input type="file" title="EXPORT" onChange={(file: any) => importFromFile(file)}/>
            
        <label>export</label>
        <LineTextField type={"text"} text={saveFileName} onChangeFunction={(text: string) => setSaveFileName(text)} />
        {/* <input type="file" title="IMPORT" onChange={(file: any) => importFromFile(file)}/> */}
        <button onClick={exportToFile}>SAVE</button>

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