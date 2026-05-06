module.exports = {
  extends: ['@cuboid/eslint-config/library'],
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: './tsconfig.json',
  },
  rules: {
    '@typescript-eslint/no-explicit-any': 'warn',
  },
};