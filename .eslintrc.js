module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['airbnb', 'prettier'],
  overrides: [
    {
      env: {
        node: true,
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  ignorePatterns: ['cypress.config.js', 'cypress', 'setupTests.js', '*.test.js'],
  rules: {
    'react/react-in-jsx-scope': ['off'],
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'import/prefer-default-export': ['off'],
    'react/function-component-definition': ['error', { namedComponents: 'arrow-function' }],
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: true,
        peerDependencies: false,
      },
    ],
    'no-unused-vars': ['off'],
    'arrow-body-style': ['off'],
    'no-new': ['off'],
    'react/prop-types': ['off'],
  },
};
