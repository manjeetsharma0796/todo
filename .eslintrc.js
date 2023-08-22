module.exports = {
  env: {
    es2022: true,
  },

  rules: {
    "no-unused-vars": "error",
    "semi": ["error", "always", { omitLastInOneLineBlock: true }],
    "quotes": ["error", "double"],
    "indent": ["error", 2, { SwitchCase: 1 }],
    "complexity": ["error", 2],
    "array-callback-return": ["error", { checkForEach: true }],
    "max-depth": ["error", 2],
    "max-statements": ["error", 18],
    "no-cond-assign": "error",
    "no-empty": "warn",
    "no-console": "warn",
    "no-implicit-coercion": "warn",
    "no-implicit-globals": "error",
    "no-param-reassign": "error",
    "no-shadow": "error",
    "id-denylist": ["error", "data", "callback"],
    "no-extra-semi": "error",
    "quotes": ["error", "double"],
    "indent": ["error", 2, { SwitchCase: 1 }],
    "no-console": "warn",
    "complexity": ["error", 4],
    "array-callback-return": ["error", { checkForEach: true }],
    "max-depth": ["error", 2],
    "no-cond-assign": "error",
    "no-empty": "warn",
    "no-implicit-coercion": "warn",
    "no-implicit-globals": "error",
    "no-param-reassign": "error",
    "id-denylist": ["error", "callback"],
    "no-extra-semi": "error",
    "array-callback-return": ["error"],
    "key-spacing": ["error"],
    "array-callback-return": ["error", { checkForEach: true }],
    "no-sparse-arrays": "warn",
    "camelcase": "warn",
    "dot-notation": "warn",
    "max-depth": ["warn", 3],
    "no-extra-semi": "warn",
    "no-nested-ternary": "warn",
    "no-undef-init": "warn",
    "no-useless-escape": "warn",
    "comma-spacing": ["warn", { before: false, after: true }],
    "max-len": "error",
    "comma-spacing": ["error"],
    "no-multi-spaces": ["error"],
    "no-param-reassign": ["error"],
    "no-extra-semi": ["error"],
    "prefer-const": ["error"],
    "prefer-destructuring": ["error"],
    "max-depth": ["error", 2],
    "max-params": ["error", 4],
    "no-extra-semi": ["error"],
    "no-use-before-define": ["error"],
    "no-this-before-super": ["error"],
    "max-nested-callbacks": ["error", { max: 2 }],
    "no-else-return": "error",
    "object-shorthand": "error",
    "array-callback-return": ["error", { checkForEach: true }],
    "prefer-template": "warn",
  },
};
