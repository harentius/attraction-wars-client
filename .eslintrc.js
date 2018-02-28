module.exports = {
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
    es6: true,
  },
  globals: {
    ASSET_VERSION: true,
    DEBUG: true,
  },
  extends: 'airbnb-base',
  rules: {
    'no-plusplus': 0,
    'import/prefer-default-export': 0,
    'no-mixed-operators': 0,
    'no-underscore-dangle': 0,
    'prefer-template': 0,
    'func-names': 0,
    'class-methods-use-this': 0,
    'import/no-mutable-exports': 0,
    "arrow-body-style": ["error", "as-needed"],
    "strict": 0,
    "arrow-parens": ["error", "always"],
    "no-bitwise": ["error", { "allow": ["~"] }],
  },
};
