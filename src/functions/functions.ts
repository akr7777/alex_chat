import { QuestionType } from "../store/features/questionTypes";
import { CLOSE_TAG, COMPANY_LC, OPEN_TAG } from "./consts";
// import { COMPANY_NAME } from "../components/mainPage/header/companyName";



export const AddAnswerToPrompt = (text: string, questions:Array<QuestionType>):string => {
    const companyName: string = localStorage.getItem(COMPANY_LC) || "SomeCompany"
    
    const textArr: Array<string> = text.split(' ');
    const g = textArr.map(word1 => {
        let word = word1
        while (word.includes(OPEN_TAG) && word.includes(CLOSE_TAG)) {
            try {
                const openTagIndex: number = word.indexOf(OPEN_TAG);
                const closeTagIndex: number = word.indexOf(CLOSE_TAG);

                if (word.slice(openTagIndex + 1, closeTagIndex) === "company") {
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
                    
                word = resultWord.trim();
            } catch {
                return '<b>!!!! ОШИБКА В ВВОДЕ ' + word + ' !!!</b>'
            }
        }
        return word
    })
    return g.join(' ');
    // return g;
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

export const AddAnswerForGPT = (prompt: Array<string>, questions:Array<QuestionType>):Array<string> => {
    const companyName: string = localStorage.getItem(COMPANY_LC) || "SomeCompany"

    return prompt.map(paragraph => {
        let oneParagraph: string = paragraph;
        while (oneParagraph.includes(OPEN_TAG) && oneParagraph.includes(CLOSE_TAG)) {
            try {
                const openTagIndex: number = oneParagraph.indexOf(OPEN_TAG);
                const closeTagIndex: number = oneParagraph.indexOf(CLOSE_TAG);

                if (oneParagraph.slice(openTagIndex + 1, closeTagIndex) === "company") {
                    const resultWordCompany = 
                    oneParagraph.slice(0, openTagIndex) + companyName + oneParagraph.slice(closeTagIndex+1, oneParagraph.length)
                    return resultWordCompany.trim();
                }

                const qNumber: number = Number(oneParagraph.slice(openTagIndex + 1, closeTagIndex)) - 1;

                oneParagraph = 
                    oneParagraph.slice(0, openTagIndex) + questions[qNumber].answer + oneParagraph.slice(closeTagIndex+1, oneParagraph.length)
                    
            } catch {
                return 'ERROR'
            }
        }
        return oneParagraph
    })
    // return g.join(' ');
    // return g;
}



export const exportToFile = () => {}