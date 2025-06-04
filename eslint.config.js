export default {
  root: true,
  extends: ["eslint:recommended", "plugin:react/recommended"],
  settings: {
    react: { version: "detect" }
  },
  env: {
    browser: true,
    es2021: true
  },
};
