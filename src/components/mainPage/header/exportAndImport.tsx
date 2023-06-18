import { useSelector } from "react-redux";
import s from "./header.module.css";
import { RootState, useAppDispatch } from "../../../store/store";
import { useState } from "react";
import { LineTextField } from "../../../common/lineTextField/labelLineText";
import { ButtonOne, LabelFor } from "../../../common/button/buttonOne";
import { changeAllQustionsListAC, changeFooterHelpTextAC, changePromptAC, changeTitleAC } from "../../../store/features/questionSlice";
import { toast } from "react-toastify";
import openFileEIicon from '../../../public/icons/arrow_circle_right.png';
import closeFileEIicon from '../../../public/icons/arrow_circle_left.png';

const ExportAndImport = () => {
    const dispatch = useAppDispatch();
    const title: string = useSelector((state: RootState) => state.questions.title);
    const prompt = useSelector((state:RootState) => state.questions.prompt);
    const questions = useSelector((state:RootState) => state.questions.questions);

    const isPromptEdit: boolean = useSelector((state: RootState) => state.questions.var.isPromptEdit);
    const [showFileEI, setShowFileEI] = useState<boolean>(false);
    const [show, setShow] = useState<boolean>(false);

    const [saveFileName, setSaveFileName] = useState<string>('');

    const exportToFile = () => {
        if (saveFileName.length > 0) {
            const FileSaver = require('file-saver');
            const exportData = {
                "title": title,
                "prompt": prompt,
                "questions": questions
            }
            const blob = new Blob([JSON.stringify(exportData)], {type: "text/plain;charset=utf-8"});
            FileSaver.saveAs(blob, saveFileName + ".txt");
            
            setSaveFileName("");
            setShow(false);
        } else {
            toast.error("Введите название файла")
        }
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
            // toast.error("Ошибка!");
            alert("ERROR: " + reader.error);
        };
    }


    return <div className={s.importExportDiv}>
        {
            showFileEI
                ? <>
                    {
                        !show && <>
                            {/* <label>import</label> */}
                            <input 
                                type="file" 
                                name="fileUpload" 
                                id="fileUpload" 
                                onChange={(file: any) => importFromFile(file)}
                                style={{display: "none"}}
                                disabled={isPromptEdit}
                            />
                            <LabelFor 
                                forWhat={"fileUpload"} 
                                helpText="Импорт из файла" 
                                text={"Импорт из файла"} 
                                isDisabled={isPromptEdit} 
                            />
                        </>
                    }
                    { 
                        show 
                            ? <>
                                <label>Имя файла:</label>
                                <LineTextField type={"text"} text={saveFileName} onChangeFunction={(text: string) => setSaveFileName(text)} />
                                <ButtonOne 
                                    text="Сохранить"
                                    onClickFunction={() => exportToFile()}
                                    helpText="Сохранить" 
                                />
                                <ButtonOne 
                                    text="Отмена"
                                    onClickFunction={() => setShow(false)}
                                    helpText="Отмена" 
                                />
                            </>
                            : <ButtonOne 
                                text={"Эскпорт в файл"} 
                                onClickFunction={() => setShow(true)} 
                                isDisabled={isPromptEdit} 
                                helpText="Экспортировать вопросы и промпт В файл"
                            />
                    }
                    <img alt="" src={closeFileEIicon} 
                        onClick={ () => setShowFileEI(false) } 
                        className={s.iconImg}
                        onMouseOver={() => dispatch(changeFooterHelpTextAC("Скрыть импорт/экспорт файла"))}
                        onMouseLeave={() => dispatch(changeFooterHelpTextAC(""))}
                    />
                </>
                : <img alt="" src={openFileEIicon} 
                    onClick={ () => setShowFileEI(true) } 
                    className={s.iconImg}
                    onMouseOver={() => dispatch(changeFooterHelpTextAC("Показать импорт/экспорт файла"))}
                    onMouseLeave={() => dispatch(changeFooterHelpTextAC(""))}
                />
        }
        
    </div>
}

export default ExportAndImport;