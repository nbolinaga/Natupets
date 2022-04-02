module.exports = {
	root: true,
	env: {
		browser: true,
		node: true,
	},
	parserOptions: {
		parser: '@babel/eslint-parser',
		requireConfigFile: false,
	},
	extends: ['@nuxtjs', 'plugin:nuxt/recommended', 'prettier'],
	plugins: [],
	// add your custom rules here
	rules: {
		'vue/multi-word-component-names': 'off',
		'vue/object-property-newline': [
			'error',
			{
				allowAllPropertiesOnSameLine: false,
				allowMultiplePropertiesPerLine: false,
			},
		],
		'vue/html-closing-bracket-newline': [
			'error',
			{
				singleline: 'never',
				multiline: 'never',
			},
		],
	},
}
