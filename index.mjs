import { analyseText } from './node_modules/tolkien-stress/index.mjs';

// eslint-disable-next-line no-unused-vars
export function pronounceWord(analysedWord, language) {
	/** Is the word in Sindarin? */
	const sindarin = language === 'Sindarin';
	/** Is the word in Quenya? */
	const quenya = !sindarin;

	const { word, syllableBreaks, stressedSyllable } = analysedWord;
	let ipa = '';
	let currentSyllable = 0;

	for (let i = 0; i < word.length; i++) {
		const letter = word[i].toLowerCase();
		const nextLetter = i + 1 < word.length ? word[i + 1].toLowerCase() : undefined;
		if (i === syllableBreaks[currentSyllable]) {
			if (currentSyllable === stressedSyllable) {
				ipa += 'ˈ';
			}
			currentSyllable++;
		}
		switch (letter) {
		case 'a':
		case 'ä':
			ipa += 'ɑ';
			break;
		case 'á':
			ipa += 'ɑː';
			break;
		case 'â':
			if (sindarin) {
				ipa += 'ɑːː';
			} else {
				throw new Error(`Unknown letter ${letter}!`);
			}
			break;
		case 'b':
			// not explicitly stated in Appendix E,
			// presumably considered obvious
			ipa += 'b';
			break;
		case 'c':
			if (nextLetter === 'h') {
				ipa += 'x';
				i++;
			} else {
				ipa += 'k';
			}
			break;
		case 'd':
			if (nextLetter === 'h') {
				ipa += 'ð';
				i++;
			} else {
				ipa += 'd';
			}
			break;
		case 'e':
		case 'ë':
			ipa += 'ɛ';
			break;
		case 'é':
			if (quenya) {
				ipa += 'eː';
			} else {
				ipa += 'ɛː';
			}
			break;
		case 'ê':
			if (sindarin) {
				ipa += 'ɛːː';
			} else {
				throw new Error(`Unknown letter ${letter}!`);
			}
			break;
		case 'f':
			if (nextLetter === undefined) {
				ipa += 'v';
			} else {
				ipa += 'f';
			}
			break;
		case 'g':
			// Black Speech and Orkish have GH but we don’t support those,
			// so no need to look at nextLetter
			ipa += 'ɡ';
			break;
		case 'h':
			if (quenya && nextLetter === 't') {
				ipa += 'x';
			} else if (quenya && nextLetter === 'l') {
				ipa += 'ɬ';
				i++;
			} else if (quenya && nextLetter === 'r') {
				ipa += 'r̥';
				i++;
			} else if (nextLetter === 'w') {
				ipa += 'ʍ';
				i++;
			} else if (nextLetter === 'y') {
				ipa += 'çj';
				i++;
			} else {
				ipa += 'h';
			}
			break;
		case 'i':
			if (i === 0 && sindarin && 'ieaou'.includes(nextLetter)) {
				ipa += 'j';
			} else {
				ipa += 'i';
			}
			break;
		case 'í':
			ipa += 'iː';
			break;
		case 'î':
			if (sindarin) {
				ipa += 'iːː';
			} else {
				throw new Error(`Unknown letter ${letter}!`);
			}
			break;
		// J and K do not occur in Elvish languages
		case 'l':
			if (nextLetter === 'h') {
				ipa += 'ɬ';
				i++;
			} else {
				ipa += 'l';
			}
			break;
		case 'm':
			// not explicitly stated in Appendix E,
			// presumably considered obvious
			ipa += 'm';
			break;
		case 'n':
			if (nextLetter === 'g') {
				ipa += 'ŋ';
				i++;
				if (i + 1 < word.length) {
					ipa += 'ɡ';
				}
			} else {
				// not explicitly stated in Appendix E,
				// presumably considered obvious
				ipa += 'n';
			}
			break;
		case 'o':
		case 'ö':
			ipa += 'ɔ';
			break;
		case 'ó':
			if (quenya) {
				ipa += 'oː';
			} else {
				ipa += 'ɔː';
			}
			break;
		case 'ô':
			if (sindarin) {
				ipa += 'ɔːː';
			} else {
				throw new Error(`Unknown letter ${letter}!`);
			}
			break;
		case 'p':
			if (nextLetter === 'h') {
				ipa += 'f';
				i++;
			} else {
				// not explicitly stated in Appendix E,
				// presumably considered obvious
				ipa += 'p';
			}
			break;
		case 'q':
			if (nextLetter === 'u' && quenya) {
				ipa += 'kw';
				i++;
			} else {
				throw new Error(`Unknown letter ${letter}!`);
			}
			break;
		case 'r':
			if (nextLetter === 'h') {
				ipa += 'r̥';
			} else {
				ipa += 'r';
			}
			break;
		case 's':
			ipa += 's';
			break;
		case 't':
			if (nextLetter === 'h') {
				ipa += 'θ';
				i++;
			} else if (nextLetter === 'y') {
				ipa += 'tj';
				i++;
			} else {
				// not explicitly stated in Appendix E,
				// presumably considered obvious
				ipa += 't';
			}
			break;
		case 'u':
			ipa += 'u';
			break;
		case 'ú':
			ipa += 'uː';
			break;
		case 'û':
			if (sindarin) {
				ipa += 'uːː';
			} else {
				throw new Error(`Unknown letter ${letter}!`);
			}
			break;
		case 'v':
			ipa += 'v';
			break;
		case 'w':
			ipa += 'w';
			break;
		// X does not occur in Elvish languages
		case 'y':
			if (quenya) {
				ipa += 'j';
			} else {
				ipa += 'y';
			}
			break;
		// Z does not occur in Elvish languages
		default:
			throw new Error(`Unknown letter ${letter}!`);
		}
	}

	ipa = ipa.replace(/(.)\1/g, '$1ː');

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
