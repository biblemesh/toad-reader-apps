import globals from 'globals';
import pluginJs from '@eslint/js';
import pluginReact from "eslint-plugin-react";
import pluginReactNative from "eslint-plugin-react-native";
import prettierConfig from 'eslint-config-prettier';
import tseslint from 'typescript-eslint';

export default tseslint.config([
  pluginJs.configs.recommended, // Apply recommended ESLint rules
  tseslint.configs.recommended, // Apply recommended TypeScript rules
  prettierConfig, // Disable rules that conflict with Prettier
  pluginReact.configs.flat['jsx-runtime'],
  {
    files: ['**/*.{js,mjs,cjs,jsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        "__DEV__": true,
        ...globals.browser,
        ...globals.node,
      },
    },
    plugins: {
      react: pluginReact,
      'react-native': pluginReactNative,
    },
    rules: {
      'react-native/no-unused-styles': 'error',
      'react-native/no-inline-styles': 'warn',
      'react-native/no-color-literals': 'warn',
      'react-native/no-raw-text': 'warn',
      'react/react-in-jsx-scope': 'off',
    },
  },
  {
    files: ['*.config.js', 'scripts/*.js'],
    rules: {
      '@typescript-eslint/no-require-imports': 'off',
    },
  },
]);
