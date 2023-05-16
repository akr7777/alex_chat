import { useSelector } from "react-redux";
import s from "./blockThree.module.css";
import { RootState, useAppDispatch } from "../../store/store";

import refreshIcon from "./../../public/icons/refresh_icon.png";
import editIcon from "./../../public/icons/edit_icon.png";
import copyIcon from "./../../public/icons/copy_icon.png";
import saveIcon from "./../../public/icons/save_icon_2.png";


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from "react";
import BigText from "../../common/bigText/bigText";
import { changeRespomseAC } from "../../store/features/promptSlice";



const BlockThree = () => {
    const dispatch = useAppDispatch();
    const responseGPT: string = useSelector((state: RootState) => state.prompt.responseGPT);

    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [newResp, setNewResp] = useState<string>(responseGPT)

    const onRefreshClickHandler = () => {
        toast.error("Запрос улетел на сервер...");
    }
    const onEditClickHandler = () => {
        setIsEdit(true);
    }
    const onSaveClickHandler = () => {
        setIsEdit(false);
        dispatch(changeRespomseAC(newResp));
    }
    const onCopyClickHandler = () => {
        navigator.clipboard.writeText(responseGPT);
        toast.info("Текст скопирован");
    }

    return <>
        <ToastContainer
            position="top-right"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
        />
        <div className={s.blockThree}>
            <div className={s.titleDiv}>
                <strong>Поле финального ответа:</strong>
            </div>

            <div className={s.responseDiv}>
                {
                    isEdit
                        ? <BigText value={newResp} onValueChange={setNewResp}/>
                        : <>{responseGPT}</>
                }
            </div>

            <div className={s.buttonsDiv}>
                <img alt="" className={s.iconsImg} src={refreshIcon} onClick={onRefreshClickHandler}/>
                {
                    isEdit
                        ? <img alt="" className={s.iconsImg} src={saveIcon} onClick={onSaveClickHandler}/>
                        : <img alt="" className={s.iconsImg} src={editIcon} onClick={onEditClickHandler}/>
                }
                <img alt="" className={s.iconsImg} src={copyIcon} onClick={onCopyClickHandler}/>
            </div>
            
        </div>

        
        </>
}

export default BlockThree;