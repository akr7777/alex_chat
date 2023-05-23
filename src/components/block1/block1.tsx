import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../store/store';
import { QuestionType, changeAllQustionsListAC } from '../../store/features/questionSlice';
import Preloader from '../../common/preloader/preloader';
import OneQuestion from './oneQuestion';
import { useEffect } from 'react';
import { getQuestionsThunk, putQuestionsThunk } from '../../store/features/questionThunk';
import s from "./blockOne.module.css";
import saveIcon from "./../../public/icons/save_icon_2.png";
import removeIcon from "./../../public/icons/delete_icon.png";

const BlockOne = () => {

    const dispatch = useAppDispatch();
    const questions: Array<QuestionType> = useSelector((state: RootState) => state.questions.questions);
    // const editableId: string = useSelector((state: RootState) => state.questions.editableId);
    const isLoading: boolean = useSelector((state:RootState) => state.questions.var.isLoading);

    useEffect( () => {
        dispatch(getQuestionsThunk());
    }, []);

    console.log('questions=', questions);

    const removeAllQuestionsClickHandler = () => {
        const answer: boolean = window.confirm('Удалить все вопросы?')
        if (answer) {
            dispatch(changeAllQustionsListAC([]));
        }
    }
    const saveAllQuestionsToServerClickHandler = () => {
        dispatch(putQuestionsThunk(questions))
    }
    
    return <div className={s.questionsWrapper}>
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
                        <img alt="Сохранить вопросы на сервер" src={saveIcon} className={s.menuIconsImg} onClick={saveAllQuestionsToServerClickHandler}/>
                        <img alt="Удалить все вопросы" src={removeIcon} className={s.menuIconsImg} onClick={removeAllQuestionsClickHandler}/>
                    </div>
                </>
        }
        
    </div>
}

export default BlockOne;