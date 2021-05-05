import sanitizeHtml from 'sanitize-html';

const sanitizerOptions = {
    allowedTags: ['span'],
    allowedAttributes: {
        'span': ['class']
    }
};

const pickFilter = (targetString: string, startIndex: number, endIndex: number, className = 'highlight'): string => {
    const leftPartString = targetString.slice(0, startIndex),
        searchString = targetString.slice(startIndex, endIndex),
        rightPartString = targetString.slice(endIndex),
        rawHtml = `${leftPartString}<span class='${className}'>${searchString}</span>${rightPartString}`;

    return sanitizeHtml(rawHtml, sanitizerOptions);
}

const setSearchHighlighted = (searchString: string, targetString: string): string => {
    const regexp = new RegExp(searchString, 'gi');
    const targetMatch = regexp.exec(targetString);

    if(targetMatch) {        
        return pickFilter(targetString, targetMatch.index, targetMatch.index + searchString.length);
    }

    return targetString;
}

export default setSearchHighlighted;
