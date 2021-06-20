import { pronounceText } from './index.mjs';

function languageCode(language) {
	switch (language) {
	case 'Quenya': return 'qya';
	case 'Sindarin': return 'sjn';
	default: throw new Error(`Unknown language ${language}!`);
	}
}

function placeholderText(language) {
	switch (language) {
	case 'Quenya': return 'Elessar';
	case 'Sindarin': return 'Mithrandir';
	default: throw new Error(`Unknown language ${language}!`);
	}
}

function languageValue() {
	return document.querySelector('input[name=language]:checked').value;
}

document.addEventListener('DOMContentLoaded', () => {
	const textInput = document.getElementById('text-input');
	const textOutput = document.getElementById('text');
	function updateText() {
		const text = textInput.value;
		const language = languageValue();
		textOutput.textContent = pronounceText(text, language).join('');
		textOutput.lang = `${languageCode(language)}-fonipa`;
	}
	function updatePlaceholder() {
		textInput.placeholder = placeholderText(languageValue());
	}
	const prefersReducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
	function listenOnTextInput() {
		textInput.removeEventListener('change', updateText);
		textInput.removeEventListener('input', updateText);
		textInput.addEventListener(prefersReducedMotionQuery.matches ? 'change' : 'input', updateText);
	}
	prefersReducedMotionQuery.addListener(listenOnTextInput);
	listenOnTextInput();
	document.getElementById('analyse').addEventListener('click', updateText);
	document.querySelectorAll('input[name=language]').forEach((languageInput) => {
		languageInput.addEventListener('input', updateText);
		languageInput.addEventListener('input', updatePlaceholder);
	});
	updateText();
	updatePlaceholder();
});
