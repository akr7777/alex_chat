import { useSelector } from "react-redux";
import s from "./blockThree.module.css";
import { RootState, useAppDispatch } from "../../store/store";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import bookIcon from "./../../public/icons/book_icon.png";
import copyIcon from "./../../public/icons/copy_icon.png";
import HistoryResponses from "./history/historyResponse";
import { changeShowResponseHistoryAC } from "../../store/features/questionSlice";
import Preloader from "../../common/preloader/preloader";

const BlockThree = () => {
    const dispatch = useAppDispatch();
    const responseGPT: string = useSelector((state: RootState) => state.questions.responseGPT);
    const showResponseHistory: boolean = useSelector((state: RootState) => state.questions.var.showResponseHistory);
    const isLoading: boolean = useSelector((state: RootState) => state.questions.varLoading.responseLoading);

    const onCopyClickHandler = () => {
        // navigator.clipboard.writeText(responseGPT);
        // https://www.npmjs.com/package/use-clipboard-copy
        // toast.info("Текст скопирован");
    }
    const onHistoryClickHandler = () => {
        dispatch(changeShowResponseHistoryAC(true));
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

        
        { showResponseHistory && <HistoryResponses /> }

        <div className={s.blockThree} onDoubleClick={onCopyClickHandler}>
            <div className={s.titleDiv}>
                <strong>Поле финального ответа:</strong>
            </div>

            {
                isLoading
                    ? <Preloader />
                    : <>
                        <div className={s.responseDiv}>
                            {responseGPT}
                        </div>

                        <div className={s.buttonsDiv}>
                            <img alt="" src={bookIcon} onClick={onHistoryClickHandler} className={s.iconsImg} />
                            <img alt="" src={copyIcon} onClick={onCopyClickHandler} className={s.iconsImg}/>
                        </div>
                    </>
            }
        </div>
    </>
}

export default BlockThree;