module.exports = {
  env: {
    browser: true,
    es6: true,
    jest: true,
  },
  extends: [
    "plugin:react/recommended",
    "plugin:prettier/recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:promise/recommended",
    "plugin:react-hooks/recommended",
  ],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
    GLOBAL: true,
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: "module",
  },
  plugins: ["react", "prettier", "jsx-a11y"],
  rules: {
    "react/jsx-filename-extension": [0],
    "react/jsx-one-expression-per-line": [0],
  },
};
