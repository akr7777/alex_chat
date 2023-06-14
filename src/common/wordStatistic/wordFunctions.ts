export const lettersCountWithSpaces = (text: string): number => {
    if (text.length === 0) return 0;
    else return text
        .replaceAll('<br/><br/>','')
        .replaceAll('<br/>','')
        .replaceAll("  ", " ")
        .replaceAll("\n", "")
        .length;
}

export const lettersCountWithoutSpaces = (text: string): number => {
    if (text.length === 0) return 0;
    else return text.replaceAll(" ", "").replaceAll("\n","").replaceAll('<br/>', '').length;
}

export const wordsCountWithoutSpaces = (text: string): number => {
    if (text.length === 0) return 0;
    else return text
        .replaceAll('<br/>', '')
        .replaceAll("\n\n","\n")
        .replaceAll("\n", " ")
        .replaceAll("  ", " ")
        .split(" ")
        .filter(word => word.length > 0)
        .length;
}

export const paragraphsCount = (text: string): number => {
    if (text.length === 0) return 0;
    else return text
        .replaceAll("\n\n","\n")
        .replaceAll("<br/><br/>", "<br/>")
        .replaceAll('\n', '<br/>')
        .split('<br/>')
        .length;
}