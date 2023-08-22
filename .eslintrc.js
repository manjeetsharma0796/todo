module.exports = {
  env: {
    es2022: true,
  },

  rules: {
    "no-unused-private-class-members": "error",
    // "no-unused-vars": "error",
    "semi": ["error", "always", { omitLastInOneLineBlock: true }],
    "quotes": ["error", "double"],
    "indent": ["error", 2, { SwitchCase: 1 }],
    "complexity": ["error", 2],
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
    "key-spacing": ["error"],
    "array-callback-return": ["error", { checkForEach: true }],
    "no-sparse-arrays": "warn",
    "camelcase": "warn",
    "dot-notation": "warn",
    "max-depth": ["warn", 3],
    "no-nested-ternary": "warn",
    "no-undef-init": "warn",
    "no-useless-escape": "warn",
    "max-len": "error",
    "comma-spacing": ["error"],
    "no-multi-spaces": ["error"],
    "prefer-const": ["error"],
    "prefer-destructuring": ["error"],
    "max-params": ["error", 4],
    "no-use-before-define": ["error"],
    "no-this-before-super": ["error"],
    "max-nested-callbacks": ["error", { max: 2 }],
    "no-else-return": "error",
    "object-shorthand": "error",
    "prefer-template": "warn",
  },
};
