import js from '@eslint/js';
import tseslint from 'typescript-eslint';

const tsProject = tseslint.config({
  project: ['./tsconfig.json'],
});

export default [
  // JavaScript 기본 추천 규칙
  js.configs.recommended,

  // TypeScript + 타입체크 기반 설정
  ...tsProject,

  // 추가 커스텀 규칙
  {
    files: ['src/**/*.ts'],
    languageOptions: {
      ecmaVersion: 2024,
      sourceType: 'module',
      parserOptions: {
        project: ['./tsconfig.json'],
      },
    },
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/explicit-function-return-type': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/strict-boolean-expressions': 'error',

      'no-console': 'warn',
      'no-debugger': 'error',
      'prefer-const': 'error',
      eqeqeq: ['error', 'always'],
    },
  },
];
