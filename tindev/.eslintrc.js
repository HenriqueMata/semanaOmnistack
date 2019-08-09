module.exports = {
  "extends": [
    "airbnb",
    "prettier",
    "prettier/react",
    "plugin:prettier/recommended",
    "eslint-config-prettier"
    ],
    "parser": "babel-eslint",
    "rules": {
    "import/no-unresolved": "off",
    "react/jsx-filename-extension": [
    1,
    {
    "extensions": [".js", ".jsx"]
    }
    ],
    "prettier/prettier": [
    "error",
    {
    "trailingComma": "es5",
    "singleQuote": true,
    "printWidth": 100
    }
    ],
    "no-use-before-define": ["error", { "variables": false }],
    "react/prop-types": 0,
    "no-underscore-dangle": 0
    },
    "plugins": ["prettier"]
};
