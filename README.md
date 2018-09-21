# Welcome to the RoboBar

*An introduction to mutation testing*

How code coverage of 100% actually means 50% is tested.

For the slides: [github.com/nicojs/testbash-mutation-testing-presentation](https://github.com/nicojs/testbash-mutation-testing-presentation)

## Getting started

1. Install [git](https://git-scm.com)
1. Install [nodejs](https://nodejs.org/)
1. Open command prompt and clone this repository:
   ```
   git clone https://github.com/stryker-mutator/robobar-example
   ```
1. Change directory into the robobar and install the dependencies.
   ```
   cd robobar-example
   npm install
   ```
1. Run tests with npm. This will generate a code coverage report. 
   ```
   npm test
   ``` 
1. Review the 100% code coverage score. Open up the code coverage report located in the `reports/coverage` directory.
1. Run mutation testing with [Stryker](https://stryker-mutator.io)
   ```
   npm run stryker
   ```
1. Review the 50% mutation score. Open up the mutation report located in the `reports/mutation` directory.
1. Run the website with `npm start`. Can you find the bug?

## Try to install stryker yourself.

If you want to install stryker yourself, step back in history using git:

```
git checkout e92b8d4
npm install
```

After that you can install stryker for yourself:

```js
npm i -g stryker-cli
stryker init
```

Choose the following options in the questionnaire:

* Install stryker?: `Yes`
* Test runner: `Karma`
* Test framework: `Jasmine`
* Language: `javascript`
* Transformations: *none*
* Reporters: `html, clear text, progress`

After the plugins are installed, try it out:

```
stryker run
```
