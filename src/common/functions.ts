import { QuestionType } from "../store/features/questionSlice"

export const addAnswerToPrompt = (text: string, questions: Array<QuestionType>):string => {
    
    const textArr: Array<string> = text.split(' ');
    const g = textArr.map(word => {
        if (word[0] === '{') {
            try {
                const closeTagIndex: number = word.lastIndexOf('}');
                const qNumber: number = Number(word.slice(1, closeTagIndex)) - 1;
                let resultWord = '<b>' + questions[qNumber].answer + word.slice(closeTagIndex+1, word.length) + '</b>'

                if (questions[qNumber].color) {
                    resultWord = '<span style="color:' + questions[qNumber].color + '">' + resultWord + "</span>"
                }
                return resultWord;
            } catch {
                return '<b>!!!! ОШИБКА В ВВОДЕ ' + word + ' !!!</b>'
            }
        }
        return word
    })
    // console.log('addAnswerToPrompt/ g=', g.join(' '))
    return g.join(' ');
}