import { pronounceWord, pronounceText } from './../index.mjs';
import 'chai/register-expect.js';

describe('pronounceWord', () => {
	const quenyaTestCases = [
		['E|ä', 'ˈeɑ'],
	];
	const sindarinTestCases = [
	];
	const testCases = [
		...quenyaTestCases.map(([word, ipa]) => [word, ipa, 'Quenya']),
		...sindarinTestCases.map(([word, ipa]) => [word, ipa, 'Sindarin']),
	].sort(([word1, language1], [word2, language2]) => word1.localeCompare(word2));
	for (const [testCase, ipa, language] of testCases) {
		let word = '';
		const syllableBreaks = [0];
		let stressedSyllable = null;
		const syllables = testCase.split('|');
		for (const [i, syllable] of syllables.entries()) {
			const lowerSyllable = syllable.toLowerCase();
			word += lowerSyllable;
			syllableBreaks.push(word.length);
			if (syllable !== lowerSyllable) {
				stressedSyllable = i;
			}
		}
		word = word.replace(/^./, (char) => char.toUpperCase());
		it(`correctly pronounces ${word} (${testCase}) in ${language} as ${ipa}`, () => {
			const analysedWord = { word, syllableBreaks, stressedSyllable };
			expect(pronounceWord(analysedWord, language)).to.equal(ipa);
		});
	}
});

describe('pronounceText', () => {
	it('correctly pronounces “Eä.” in Quenya', () => {
		const ea = 'Eä.';
		const expected = [
			'ˈeɑ',
			'.',
		];
		const actual = pronounceText(ea, 'Quenya');
		expect(actual).to.eql(expected);
	});
});
