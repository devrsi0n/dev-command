# dev-command

A modern, flexible command tool for JavaScript developers.

[![Version](https://img.shields.io/npm/v/dev-command.svg)](https://npmjs.org/package/dev-command)
[![CircleCI](https://circleci.com/gh/devrsi0n/dev-command/tree/master.svg?style=shield)](https://circleci.com/gh/devrsi0n/dev-command/tree/master)
[![License](https://img.shields.io/npm/l/dev-command.svg)](https://github.com/devrsi0n/dev-command/blob/master/package.json)

## Install

```sh
npm i -g dev-command
# or
yarn global add dev-command
```

## Usage

### init

The `init` command will generate flexible config files or scripts and install all npm dependencies silently.

It's so simple to add good linter for your exists project.

```sh
dev init

? Boilerplate type (Use arrow keys)
❯ ESLint
  prettier
  commitlint
  babel
  editorconfig
  license
  gitignore
```

### open

Open git repo or package.json repo URL with default browser in current working directory.

```sh
dev open
```

### git

```sh
dev git log
```

Turn ugly `git log` into pretty graph.

<div align="left">
  <img src="./assets/git-log.png" width="350px" style="margin-right:50px;" alt="Git log">
  <img src="./assets/git-pretty-log.png" width="350px" alt="Git pretty log">
</div>

### css-to-js

Convert `src/**/*.css` file to `src/**/*.css.js`

`src`(Directory) is optional, using cwd if not exist

```sh
dev css-to-js src
```
