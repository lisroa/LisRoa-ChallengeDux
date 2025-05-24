/** @typedef  {import("prettier").Config} PrettierConfig */
/** @typedef {import("prettier-plugin-tailwindcss").PluginOptions} TailwindConfig */
/** @typedef  {import("@ianvs/prettier-plugin-sort-imports").PluginConfig} SortImportsConfig */

/** @type { PrettierConfig | SortImportsConfig } */
const config = {
	plugins: ['@ianvs/prettier-plugin-sort-imports', 'prettier-plugin-tailwindcss'],

	arrowParens: 'avoid',
	jsxBracketSameLine: false,
	jsxSingleQuote: true,
	printWidth: 120,
	quoteProps: 'as-needed',
	semi: true,
	singleQuote: true,
	tabWidth: 2,
	trailingComma: 'none',
	useTabs: true,

	importOrder: ['<THIRD_PARTY_MODULES>', '^~/', '^[../]', '^[./]'],
	importOrderParserPlugins: ['typescript', 'jsx', 'decorators-legacy'],
	importOrderTypeScriptVersion: '4.4.0'
};

export default config;
