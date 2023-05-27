import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { QuestionType } from "../store/features/questionTypes";
// import { COMPANY_NAME } from "../components/mainPage/header/companyName";

const OPEN_TAG = '{';
const CLOSE_TAG = '}';

export const AddAnswerToPrompt = (text: string):string => {
    // console.log('AddAnswerToPrompt');
    
    const questions:Array<QuestionType> = useSelector((state: RootState) => state.questions.questions);
    const companyName: string = useSelector((state: RootState) => state.questions.company);
    
    const textArr: Array<string> = text.split(' ');
    const g = textArr.map(word => {
        if (word.includes(OPEN_TAG) && word.includes(CLOSE_TAG)) {
            try {
                const openTagIndex: number = word.indexOf(OPEN_TAG);
                const closeTagIndex: number = word.indexOf(CLOSE_TAG);

                // console.log('word.slice(openTagIndex + 1, closeTagIndex=', word.slice(openTagIndex + 1, closeTagIndex));
                
                if (word.slice(openTagIndex + 1, closeTagIndex) === "company") {
                    // console.log('2222');
                    
                    // const companyName: string = localStorage.getItem(COMPANY_NAME) || "COMPANY_NAME";
                    const resultWordCompany = 
                        word.slice(0, openTagIndex) +
                        '<b style="color:yellow">' + companyName + '</b>' +
                        word.slice(closeTagIndex+1, word.length)
                    return resultWordCompany.trim();
                }

                const qNumber: number = Number(word.slice(openTagIndex + 1, closeTagIndex)) - 1;

                let resultWord = 
                    word.slice(0, openTagIndex) +
                    '<b style="color:' + questions[qNumber].color + '">' +
                    questions[qNumber].answer + 
                    '</b>' +
                    word.slice(closeTagIndex+1, word.length)
                    
                // if (questions[qNumber].color) {
                //     resultWord = '<span style="color:' + questions[qNumber].color + '">' + resultWord + "</span>"
                // }
                
                return resultWord.trim();
            } catch {
                return '<b>!!!! ОШИБКА В ВВОДЕ ' + word + ' !!!</b>'
            }
        }
        return word
    })
    return g.join(' ');
}


export const inputBracketsInText = (prompt: Array<string>, questions: Array<QuestionType>):Array<string> => {
    const result:Array<string> = [...prompt].map(p => {
        for (let i=0; i<questions.length; i++) {
            if (p.includes(questions[i].answer)) {
                return p.replaceAll(questions[i].answer, '{'+ (i+1) +'}')
            }
        }
        return p;
    }); 

    return result;
}