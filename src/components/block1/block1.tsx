import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../store/store';
import { addQuestionAC, changeFirstBlockWidthAC, changeFooterHelpTextAC } from '../../store/features/questionSlice';
import Preloader from '../../common/preloader/preloader';
import OneQuestion from './oneQuestion';
import { useEffect } from 'react';
import { getQuestionsThunk, putQuestionsThunk } from '../../store/features/questionThunk';
import s from "./blockOne.module.css";
import saveIcon from "./../../public/icons/save_icon_2.png";
import saveDisabledIcon from "./../../public/icons/save_icon_disabled.png";
import removeIcon from "./../../public/icons/delete_icon.png";
import hideIcon from "../../public/icons/hide_show_icon_1.png";
import showIcon from "../../public/icons/hide_show_icon_2.png";
import plusIcon from "./../../public/icons/plus_icon.png";
import { QuestionType } from '../../store/features/questionTypes';
import CompanyField from './companyField';
import { ToastContainer, toast } from 'react-toastify';
// import { uuid } from 'uuidv4';

const BlockOne = () => {

    const dispatch = useAppDispatch();
    const questions: Array<QuestionType> = useSelector((state: RootState) => state.questions.questions);
    const baseQuestions: Array<QuestionType> = useSelector((state: RootState) => state.questions.baseQuestions);
    const isQuestionsEqual: boolean = JSON.stringify(questions) === JSON.stringify(baseQuestions);
    // const editableId: string = useSelector((state: RootState) => state.questions.editableId);
    const isLoading: boolean = useSelector((state:RootState) => state.questions.varLoading.questionsLoading);
    const isShort: boolean = useSelector((state: RootState) => state.questions.var.isFirstBlockShort);
    useEffect( () => {
        dispatch(getQuestionsThunk());
    }, []);


    // const removeAllQuestionsClickHandler = () => {
    //     const answer: boolean = window.confirm('Удалить все вопросы?')
    //     if (answer) {
    //         dispatch(changeAllQustionsListAC([]));
    //     }
    // }
    const saveAllQuestionsToServerClickHandler = () => { dispatch(putQuestionsThunk(questions)) }
    const onDisablaedSaveIconClickHandler = () => toast.info('Текущая версия вопросов не отличается от базовой. Не нужно ничего сохранять на сервер');
    const addQuestionClickHandler = () => { dispatch(addQuestionAC()) }
    
    return <div className={s.questionsWrapper}>

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

        {
            isShort
                // ? <label onClick={() => dispatch(changeFirstBlockWidthAC(false))}>+</label>
                ?   <img alt="" src={showIcon} 
                        onClick={ () => dispatch(changeFirstBlockWidthAC(false)) }
                        className={s.hideShowIcon}
                        onMouseOver={() => dispatch(changeFooterHelpTextAC("Показать вопросы"))}
                        onMouseLeave={() => dispatch(changeFooterHelpTextAC(""))}
                    />
                : <>
                    {/* <label onClick={() => dispatch(changeFirstBlockWidthAC(true))}>-</label> */}
                    <img alt="" src={hideIcon} 
                        onClick={ () => dispatch(changeFirstBlockWidthAC(true)) } 
                        className={s.hideShowIcon}
                        onMouseOver={() => dispatch(changeFooterHelpTextAC("Скрыть вопросы"))}
                        onMouseLeave={() => dispatch(changeFooterHelpTextAC(""))}
                    />
                    <CompanyField />

                    <strong>Вопросы:</strong>
                    {
                        isLoading
                            ? <Preloader />
                            : <>
                                <div className={s.allQuestionsField}>
                                    {
                                        questions.map( (elem:QuestionType, elemIndex: number) => {
                                            return <div key={elem.id}>
                                                <OneQuestion 
                                                    index={elemIndex} 
                                                    elem={elem}
                                                    questionsLength={questions.length}
                                                />
                                            </div>
                                        })
                                    }
                                </div>

                                <div className={s.buttonsDiv}>
                                    {
                                        isQuestionsEqual
                                            ?   <img 
                                                    alt="" src={saveDisabledIcon} className={s.menuIconsImg} 
                                                    onClick={onDisablaedSaveIconClickHandler}
                                                    onMouseOver={() => dispatch(changeFooterHelpTextAC("Сохранить все вопросы на сервер в текущем виде"))}
                                                    onMouseLeave={() => dispatch(changeFooterHelpTextAC(""))}
                                                />
                                            :   <img 
                                                    alt="" src={saveIcon} className={s.menuIconsImg} 
                                                    onClick={saveAllQuestionsToServerClickHandler}
                                                    onMouseOver={() => dispatch(changeFooterHelpTextAC("Сохранить все вопросы на сервер в текущем виде"))}
                                                    onMouseLeave={() => dispatch(changeFooterHelpTextAC(""))}
                                                />

                                    }
                                    
                                    {/* <img alt="Удалить все вопросы" src={removeIcon} className={s.menuIconsImg} onClick={removeAllQuestionsClickHandler}/> */}
                                    <img 
                                        alt="Добавить вопрос" src={plusIcon} className={s.menuIconsImg} 
                                        onClick={addQuestionClickHandler}
                                        onMouseOver={() => dispatch(changeFooterHelpTextAC("Добавить новый вопрос"))}
                                        onMouseLeave={() => dispatch(changeFooterHelpTextAC(""))}
                                    />
                                </div>
                            </>
                    }
                </>
        }
        
        
    </div>
}

export default BlockOne;