/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
        './src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
        './node_modules/flowbite-vue/**/*.{js,jsx,ts,tsx,vue}',
        './node_modules/flowbite/**/*.{js,jsx,ts,tsx}'
    ],

	theme: {
		extend: {

        },
	},
	plugins: [
        require('flowbite/plugin')
    ],
}