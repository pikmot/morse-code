npm install --save-dev jest
npm fund

npm install --save-dev @babel/core @babel/preset-env babel-jest

new file "babel.config.js"

```js
module.exports = {
  presets: [["@babel/preset-env", { targets: { node: "current" } }]],
};
```

```js

"scripts": {
    "test": "jest",
    "test:watch": "jest --watchAll",
    "test:coverage": "jest --coverage"
  }

```

npm run test

npm run test-watch ./js/test.js

npm test -- --watch
