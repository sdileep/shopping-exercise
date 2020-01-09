# Shopping exercise

An implementation for the shopping exercise using [TypeScript][typescript] [3.7][typescript-37].

What's included:

- [TypeScript][typescript] [3.7][typescript-37],
- [ESLint][eslint] with some initial rules recommendation,
- [Jest][jest] unit testing and code coverage,
- Type definitions for Node.js and Jest,
- [Prettier][prettier] to enforce a consistent code style,
- [NPM scripts for common operations](#available-scripts),
- shopping exercise code and unit tests

## Quick start

This project is intended to be used with the latest Active LTS release of [Node.js][nodejs].

To start, clone the repository with following commands:

```sh
git clone https://github.com/sdileep/shopping-exercise
```

or download and unzip current `master` branch:

```sh
wget https://github.com/sdileep/shopping-exercise/archive/master.zip -O shopping-exercise.zip
unzip shopping-exercise.zip && rm shopping-exercise.zip
```

and then

```sh
cd shopping-exercise
npm install

npm run test
```

### Unit tests

Unit tests are co-located with the code for context & convenience. I'm not opposed to using `tests` or `__tests__` directories for the same - happy to discuss.

## Available scripts

- `clean` - remove coverage data, Jest cache and transpiled files,
- `build` - transpile TypeScript to ES6,
- `build:watch` - interactive watch mode to automatically transpile source files,
- `lint` - lint source files and tests,
- `test` - run tests,
- `test:watch` - interactive watch mode to automatically re-run tests

[nodejs]: https://nodejs.org/dist/latest-v12.x/docs/api/
[typescript]: https://www.typescriptlang.org/
[typescript-37]: https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-7.html
[jest]: https://facebook.github.io/jest/
[eslint]: https://github.com/eslint/eslint
[prettier]: https://prettier.io
