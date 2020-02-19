# standard-healthcheck

[![Build Status](https://travis-ci.org/julie-ng/standard-healthcheck.svg?branch=master)](https://travis-ci.org/julie-ng/standard-healthcheck)
[![Test Coverage](https://api.codeclimate.com/v1/badges/d00bb74152c7914dccdd/test_coverage)](https://codeclimate.com/github/julie-ng/standard-healthcheck/test_coverage)
[![Maintainability](https://api.codeclimate.com/v1/badges/d00bb74152c7914dccdd/maintainability)](https://codeclimate.com/github/julie-ng/standard-healthcheck/maintainability)

## Install

```
npm install --save standard-healthcheck
```

## Usage

```javascript
const Healthcheck = require('standard-healthcheck')

const healthcheck = new Healthcheck({
	version: '1.0',
	description: 'My demo app',
	includeEnv: ['WEBSITE_HOSTNAME', 'WEBSITE_INSTANCE_ID', 'NODE_ENV']
})

app.get('/health', healthcheck.endpoint)
```