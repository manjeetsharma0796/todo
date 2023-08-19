module.exports = {
  env: {
    es2022: true,
  },

  rules: {
    "semi": ["error", "always", { omitLastInOneLineBlock: true }],
    "quotes": ["error", "double"],
    "indent": ["error", 2, { SwitchCase: 1 }],

    "complexity": ["error", 2],
    "array-callback-return": ["error", { checkForEach: true }],
    "max-depth": ["error", 2],
    "max-statements": ["error", 10],

    "no-cond-assign": "error",
    "no-empty": "warn",
    "no-console": "warn",
    "no-implicit-coercion": "warn",
    "no-implicit-globals": "error",
    "no-param-reassign": "error",
    "no-shadow": "error",
    "id-denylist": ["error", "data", "callback"],
    "no-extra-semi": "error",
  },
};
