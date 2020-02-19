# standard-healthcheck

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