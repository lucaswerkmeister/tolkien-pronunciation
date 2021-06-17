import { pronounceWord, pronounceText } from './../index.mjs';
import 'chai/register-expect.js';

describe('pronounceWord', () => {
	it( 'adds slashes', () => {
		const word = pronounceWord({word: 'word'}, 'Sindarin');
		expect(word).to.equal('/word/');
	});
});

describe('pronounceText', () => {
	it( 'pronounces each word', () => {
		const segments = pronounceText('test text', 'Sindarin');
		expect(segments).to.eql(['/test/', ' ', '/text/']);
	});
});
