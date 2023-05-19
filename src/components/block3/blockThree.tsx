import { useSelector } from "react-redux";
import s from "./blockThree.module.css";
import { RootState } from "../../store/store";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import bookIcon from "./../../public/icons/book_icon.png";
import copyIcon from "./../../public/icons/copy_icon.png";
import { useState } from "react";
import HistoryResponses from "./history";

const BlockThree = () => {
    const [showHistory, setShowHistory] = useState<boolean>(false);
    const responseGPT: string = useSelector((state: RootState) => state.questions.responseGPT);
    const onCopyClickHandler = () => {
        navigator.clipboard.writeText(responseGPT);
        toast.info("Текст скопирован");
    }
    const onHistoryClickHandler = () => {
        // alert('history')
        setShowHistory(true);
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

        <HistoryResponses show={showHistory} setShow={setShowHistory}/>

        <div className={s.blockThree} onDoubleClick={onCopyClickHandler}>
            <div className={s.titleDiv}>
                <strong>Поле финального ответа:</strong>
            </div>

            <div className={s.responseDiv}>
                {responseGPT}
            </div>

            <div className={s.buttonsDiv}>
                <img alt="" src={bookIcon} onClick={onHistoryClickHandler} className={s.iconsImg} />
                <img alt="" src={copyIcon} onClick={onCopyClickHandler} className={s.iconsImg}/>
            </div>
        </div>
    </>
}

export default BlockThree;