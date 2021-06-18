#!/usr/bin/env node
import process from 'process';
import { Transform } from 'stream';
import { StringDecoder } from 'string_decoder';
import { pronounceText } from './index.mjs';

if (process.argv.length > 2) {
	process.argv.slice(2)
		.flatMap((arg) => pronounceText(`${arg}\n`, 'Sindarin'))
		.forEach((text) => process.stdout.write(text));
} else {
	const stringDecoder = new StringDecoder('utf8');
	process.stdin
		.pipe(new Transform({
			transform(chunk, encoding, callback) {
				for (const segment of pronounceText(stringDecoder.write(chunk), 'Sindarin')) {
					this.push(segment);
				}
				callback();
			},
		}))
		.pipe(process.stdout);
}
