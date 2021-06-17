import { analyseText } from 'tolkien-stress/index.mjs';

// eslint-disable-next-line no-unused-vars
export function pronounceWord(analysedWord, language) {
	const { word, syllableBreaks, stressedSyllable } = analysedWord;
	let ipa = '';
	let currentSyllable = 0;

	for (let i = 0; i < word.length; i++) {
		const letter = word[i].toLowerCase();
		if (i === syllableBreaks[currentSyllable]) {
			if (currentSyllable === stressedSyllable) {
				ipa += 'ˈ';
			}
			currentSyllable++;
		}
		switch (letter) {
		case 'e':
		case 'ë':
			ipa += 'e';
			break;
		case 'a':
		case 'ä':
			ipa += 'ɑ';
			break;
		case 'u':
		case 'ü':
			ipa += 'u';
			break;
		case 'r':
			ipa += 'r';
			break;
		default:
			throw new Error(`Unknown letter ${letter}!`);
		}
	}
	return ipa;
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
