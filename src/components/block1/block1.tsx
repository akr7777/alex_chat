import { useSelector } from 'react-redux';
import s from './blockOne.module.css';
import { RootState } from '../../store/store';
import { QuestionType } from '../../store/features/questionSlice';
import EditableQuestion from './editableQuestion';
import NonEditableQuestion from './nonEditableQuestion';
import Preloader from '../../common/preloader/preloader';

const BlockOne = () => {

    const questions: Array<QuestionType> = useSelector((state: RootState) => state.questions.questions);
    const editableId: string = useSelector((state: RootState) => state.questions.editableId);
    const isLoading: boolean = useSelector((state:RootState) => state.questions.var.isLoading);

    // console.log('questions=', questions);
    
    return <div >
        <strong>Вопросы:</strong>
        {
            isLoading
                ? <Preloader />
                : <>{
                    questions.map( (elem:QuestionType, elemIndex: number) => {
                        return <div key={elem.id}>
                            {
                                editableId === elem.id
                                    ?   <EditableQuestion 
                                            index={elemIndex} 
                                            elem={elem}
                                        />
                                    :   <NonEditableQuestion 
                                            index={elemIndex} 
                                            elem={elem}
                                        />
                            }
                        </div>
                    })
                }</>
        }
        
    </div>
}

export default BlockOne;