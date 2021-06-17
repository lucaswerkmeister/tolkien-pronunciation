import { analyseText } from 'tolkien-stress/index.mjs';

// eslint-disable-next-line no-unused-vars
export function pronounceWord(word, language) {
	return `/${word.word}/`;
}

export function pronounceText(text, language) {
	const segments = [];
	for (const segment of analyseText(text, language)) {
		if (typeof segment === 'string') {
			segments.push(segment);
		} else {
			segments.push(pronounceWord(segment, language));
		}
	}
	return segments;
}
