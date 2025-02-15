# Mono

## Basic Setup

To run applications and packages in the monorepo ensure you first run:

1. `pnpm i` at the `mono` root.
2. Run `pnpm build` to ensure all relevant packages are correctly built.

## About

The purpose of this monorepo configuration is to ensure strict coding standards and facilitate code sharing. The monorepo uses `pnpm workspaces` at its core and provides several shared packages to be found under the `packages` folder.

### Monorepo Documentation

- [Architecture](docs/core/ARCHITECTURE.md)
- [Monorepo](docs/core/MONOREPO.md)

Coding standards are enforced through the use of

- `eslint`
- `prettier`
- `typescripts`

Shared configuration files for these tools exist in `packages` and the same base configurations are used in the monorepo itself.

Some other configured tools are:

- [Husky](docs/tools/HUSKY.md): run code checks and enforce standards locally as a first prevention
- [LintStaged](docs/tools/LINTSTAGED.md): only run checks on staged files
- [CommitLint](docs/tools/COMMITLINT.md) enforce [Conventional Commit](https://www.conventionalcommits.org/en/v1.0.0/) standard

### Monorepo core packages

The current packages are listed below

- [ESLint](packages/eslint-config/README.md)
- [Prettier](packages/prettier-config/README.md)
- [TSconfig](packages/tsconfig-config/README.md)

### Git Actions

Basic CI actions to run code quality checks have been setup in

- [Code checks](.github/workflows/code-checks.yml)

### Documentation

Documentation has been provided from the outset and can be found in `docs/tools/` along with a [TEMPLATE.md](docs/core/TEMPLATE.md) file

### Development with extension

To be able to develop packages and test those in extension, check out this [guide](docs/extension-development.md)

## License

[MIT](LICENSE) © [Leather Wallet LLC](https://github.com/leather-io/mono)
