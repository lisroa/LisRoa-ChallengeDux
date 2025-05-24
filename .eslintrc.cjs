// @ts-check
import * as path from 'node:path';
import importAliasPlugin from '@dword-design/eslint-plugin-import-alias';
import { includeIgnoreFile } from '@eslint/compat';
import eslint from '@eslint/js';
import nextPlugin from '@next/eslint-plugin-next';
import stylisticJs from '@stylistic/eslint-plugin-js';
import stylisticJsx from '@stylistic/eslint-plugin-jsx';
import stylisticTs from '@stylistic/eslint-plugin-ts';
import prettierRecommended from 'eslint-plugin-prettier/recommended';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import unusedImportsPlugin from 'eslint-plugin-unused-imports';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
	includeIgnoreFile(path.join(import.meta.dirname, '.gitignore')),
	{
		files: ['**/*.js'],
		languageOptions: {
			globals: {
				...globals.node
			}
		}
	},
	{
		files: ['**/*.js', '**/*.ts', '**/*.tsx'],
		extends: [eslint.configs.recommended, prettierRecommended]
	},
	{
		files: ['**/*.ts', '**/*.tsx'],
		plugins: {
			'@dword-design/import-alias': importAliasPlugin,
			'@stylistic/js': stylisticJs,
			'@stylistic/jsx': stylisticJsx,
			'@stylistic/ts': stylisticTs,
			'unused-imports': unusedImportsPlugin
		},
		extends: [...tseslint.configs.recommended, ...tseslint.configs.stylisticTypeChecked],
		rules: {
			/* typescript-eslint */
			'@typescript-eslint/adjacent-overload-signatures': ['error'],
			'@typescript-eslint/array-type': ['error', { default: 'array-simple' }],
			'@typescript-eslint/consistent-type-definitions': 'off',
			'@typescript-eslint/consistent-type-imports': [
				'warn',
				{
					prefer: 'type-imports',
					fixStyle: 'inline-type-imports'
				}
			],
			'@typescript-eslint/explicit-function-return-type': 'off',
			'@typescript-eslint/explicit-module-boundary-types': 'off',
			'@typescript-eslint/interface-name-prefix': 'off',
			'@typescript-eslint/no-empty-function': ['error'],
			'@typescript-eslint/no-empty-interface': 'off',
			'@typescript-eslint/no-empty-object-type': 'off',
			'@typescript-eslint/no-explicit-any': 'off',
			'@typescript-eslint/no-inferrable-types': ['error', { ignoreParameters: true }],
			'@typescript-eslint/no-invalid-this': ['error'],
			'@typescript-eslint/no-misused-promises': [
				'error',
				{ checksVoidReturn: { arguments: false, attributes: false } }
			],
			'@typescript-eslint/no-redeclare': ['error'],
			'@typescript-eslint/no-restricted-types': ['error', { types: { Function: true, Object: true } }],
			'@typescript-eslint/no-shadow': ['error'],
			'@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_', ignoreRestSiblings: true }],
			'@typescript-eslint/prefer-nullish-coalescing': [
				'error',
				{ ignoreMixedLogicalExpressions: true, ignorePrimitives: { string: true } }
			],
			'@typescript-eslint/require-await': ['error'],
			'@typescript-eslint/return-await': ['error'],

			/* eslint */
			'brace-style': 'off',
			curly: 'error',
			'func-call-spacing': 'off',
			'lines-between-class-members': 'off',
			'no-empty-function': 'off',
			'no-invalid-this': 'off',
			'no-redeclare': 'off',
			'no-restricted-globals': ['error'],
			'no-return-await': 'off',
			'no-shadow': 'off',
			'no-unused-vars': 'off',
			'object-shorthand': ['error', 'always'],
			quotes: 'off',
			'require-await': 'off',
			semi: 'off',
			'space-before-function-paren': 'off',

			/* plugin:@stylistic/jsx */
			'@stylistic/jsx/jsx-curly-brace-presence': ['error', 'never'],

			/* plugin:@stylistic/ts */
			'@stylistic/ts/brace-style': ['error'],
			'@stylistic/ts/func-call-spacing': ['error', 'never'],
			'@stylistic/ts/lines-between-class-members': ['error', 'always', { exceptAfterOverload: true }],
			'@stylistic/ts/quotes': ['error', 'single', { avoidEscape: true }],
			'@stylistic/ts/semi': ['error'],
			'@stylistic/ts/space-before-function-paren': [
				'error',
				{
					anonymous: 'always',
					named: 'never',
					asyncArrow: 'always'
				}
			],
			'@stylistic/js/spaced-comment': ['error', 'always'],

			/* plugin:@dword-design/import-alias */
			'@dword-design/import-alias/prefer-alias': [
				'error',
				{
					alias: {
						'@': './'
					}
				}
			],

			/* plugin:unused-imports */
			'unused-imports/no-unused-imports': 'error',
			'unused-imports/no-unused-vars': 'off'
		}
	},
	{
		files: ['**/*.ts', '**/*.tsx'],
		plugins: {
			'@next/next': nextPlugin,
			react: reactPlugin,
			'react-hooks': reactHooksPlugin
		},
		rules: {
			...reactPlugin.configs['jsx-runtime'].rules,
			...reactPlugin.configs.recommended.rules,
			...reactHooksPlugin.configs.recommended.rules,
			...nextPlugin.configs.recommended.rules,
			...nextPlugin.configs['core-web-vitals'].rules,
			// TypeError: context.getAncestors is not a function
			'@next/next/no-duplicate-head': 'off',

			/* plugin:react */
			'react/jsx-boolean-value': ['error', 'never'],
			'react/prop-types': 'off',
			'react/react-in-jsx-scope': 'off',
			'react/self-closing-comp': 'error'
		},
		languageOptions: {
			globals: {
				React: 'writable'
			}
		}
	},
	{
		linterOptions: { reportUnusedDisableDirectives: true },
		languageOptions: { parserOptions: { projectService: true } }
	}
);
