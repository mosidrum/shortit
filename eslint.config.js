import js from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier/flat';
import importPlugin from 'eslint-plugin-import';
import pluginJsxA11y from 'eslint-plugin-jsx-a11y';
import onlyWarn from 'eslint-plugin-only-warn';
import pluginReact from 'eslint-plugin-react';
import pluginReactHooks from 'eslint-plugin-react-hooks';
import securityPlugin from 'eslint-plugin-security';
import sonarjsPlugin from 'eslint-plugin-sonarjs';
import turboPlugin from 'eslint-plugin-turbo';
import unicornPlugin from 'eslint-plugin-unicorn';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default [
  js.configs.recommended,
  eslintConfigPrettier, // disable ESLint rules that conflict with Prettier
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  pluginJsxA11y.flatConfigs.recommended,
  unicornPlugin.configs.recommended,
  sonarjsPlugin.configs.recommended,
  {
    plugins: {
      turbo: turboPlugin,
      import: importPlugin,
      onlyWarn,
      security: securityPlugin,
      'react-hooks': pluginReactHooks
    },
    settings: {
      react: { version: 'detect' }
    },
    languageOptions: {
      parserOptions: {
        project: './tsconfig.eslint.json'
      },
      globals: {
        ...globals.browser
      }
    },
    rules: {
      // React
      ...pluginReactHooks.configs.recommended.rules,
      'react/react-in-jsx-scope': 'off',
      'react/function-component-definition': [
        'error',
        {
          namedComponents: 'arrow-function',
          unnamedComponents: 'arrow-function'
        }
      ],
      'react/jsx-filename-extension': ['warn', { extensions: ['.js', '.jsx', '.ts', '.tsx'] }],
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',

      // JSX accessibility
      'jsx-a11y/no-static-element-interactions': 'off',
      'jsx-a11y/click-events-have-key-events': 'off',

      // Import rules
      'import/order': [
        'error',
        {
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'type'],
          'newlines-between': 'always',
          alphabetize: { order: 'asc', caseInsensitive: true }
        }
      ],

      // Code style & consistency
      'no-console': 'warn',
      'no-var': 'error',
      eqeqeq: ['error', 'always'],
      'prefer-arrow-callback': 'error',
      'func-style': ['error', 'expression'],
      'arrow-body-style': ['error', 'as-needed'],
      'max-len': ['error', { code: 120 }],

      // Security
      'security/detect-unsafe-regex': 'warn',
      'security/detect-non-literal-regexp': 'warn',
      'security/detect-non-literal-fs-filename': 'warn',

      // Miscellaneous
      'no-restricted-syntax': [
        'error',
        {
          selector: 'Literal[value=/^#[0-9A-Fa-f]{2,8}$/]',
          message: 'Avoid hardcoded color values. Use a variable from your color palette instead.'
        }
      ],
      'unicorn/filename-case': 'off',
      'unicorn/prevent-abbreviations': 'off',
      'unicorn/no-null': 'off',
      'unicorn/no-array-for-each': 'off',
      'unicorn/prefer-module': 'off',
      'sonarjs/todo-tag': 'off'
    }
  },
  {
    files: ['**/*.{ts,tsx,js,jsx}'],
    ignores: ['dist/**', 'build/**', 'coverage/**']
  }
];
