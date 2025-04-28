import stopwords from './stopwords.js';

function summarizeText(text) {
    const sentences = text.match(/[^\.!\?]+[\.!\?]+/g) || [text];

    const wordFreq = {};
    const words = text
        .toLowerCase()
        .replace(/[^a-z\s]/g, '')
        .split(/\s+/)
        .filter(word => word && !stopwords.includes(word));
    words.forEach(word => {
        wordFreq[word] = (wordFreq[word] || 0) + 1;
    });

    const sentenceScores = sentences.map(sentence => {
        const sentenceWords = sentence
            .toLowerCase()
            .replace(/[^a-z\s]/g, '')
            .split(/\s+/)
            .filter(word => word && !stopwords.includes(word));
        const score = sentenceWords.reduce((sum, word) => sum + (wordFreq[word] || 0), 0);
        return { sentence, score };
    });

    const summaryLength = Math.max(1, Math.ceil(sentences.length * 0.3));
    const topSentences = sentenceScores
        .sort((a, b) => b.score - a.score)
        .slice(0, summaryLength)
        .map(obj => obj.sentence.trim());

    const summary = sentences
        .filter(sentence => topSentences.includes(sentence.trim()))
        .join(' ')
        .trim();

    return summary;
}

export default summarizeText;
