/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./src/**/*.{html,ts}",
	],
	theme: {
		extend: {
			flex: {
				'0': '0 0 200px'
			}
		},
	},
	plugins: [],
}