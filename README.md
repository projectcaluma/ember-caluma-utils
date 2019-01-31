# ember-caluma-utils

This addon provides some common utilities for Ember.js-based frontends for Caluma.

## Installation

```
ember install ember-caluma-utils
```

## Usage

The addon includes a mirage server for mocking Caluma's GraphQL API, which is generated from the GraphQL schema definition. To update the schema, run

```bash
yarn update-schema
yarn fragment-types
```

## Contributing

### Installation

- `git clone <repository-url>`
- `cd ember-caluma-utils`
- `yarn install`

### Linting

- `yarn lint:hbs`
- `yarn lint:js`
- `yarn lint:js --fix`

### Running tests

- `ember test` – Runs the test suite on the current Ember version
- `ember test --server` – Runs the test suite in "watch mode"
- `ember try:each` – Runs the test suite against multiple Ember versions

### Running the dummy application

- `ember serve`
- Visit the dummy application at [http://localhost:4200](http://localhost:4200).

For more information on using ember-cli, visit [https://ember-cli.com/](https://ember-cli.com/).

## License

This project is licensed under the [MIT License](LICENSE).
