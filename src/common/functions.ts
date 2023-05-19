import { useSelector } from "react-redux";
import { RootState } from "../store/store";

const OPEN_TAG = '{';
const CLOSE_TAG = '}';

export const AddAnswerToPrompt = (text: string):string => {
    const questions = useSelector((state: RootState) => state.questions.questions);
    
    const textArr: Array<string> = text.split(' ');
    const g = textArr.map(word => {
        if (word.includes(OPEN_TAG) && word.includes(CLOSE_TAG)) {
            try {
                const openTagIndex: number = word.indexOf(OPEN_TAG);
                const closeTagIndex: number = word.indexOf(CLOSE_TAG);
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