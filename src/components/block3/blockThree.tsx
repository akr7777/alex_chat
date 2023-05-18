import { useSelector } from "react-redux";
import s from "./blockThree.module.css";
import { RootState } from "../../store/store";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BlockThree = () => {
    const responseGPT: string = useSelector((state: RootState) => state.questions.responseGPT);
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
        <div className={s.blockThree} onDoubleClick={onCopyClickHandler}>
            <div className={s.titleDiv}>
                <strong>Поле финального ответа:</strong>
            </div>

            <div className={s.responseDiv}>
                {responseGPT}
            </div>
        </div>
    </>
}

export default BlockThree;