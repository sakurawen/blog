module.exports = {
	content: [
		'./pages/**/*.{ts,tsx}',
		'./components/**/*.{ts,tsx}',
		'./utils/**/*.{ts,tsx}',
	],
	darkMode: 'class',
	theme: {
		extend: {
			fontFamily: {
				noto: "'Noto Sans SC', sans-serif;",
			},
			content: {
				'blockquote-before': '"\\201C"',
				'blockquote-after': '"\\201D"',
			},
		},
	},
	plugins: [],
};
