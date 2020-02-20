# standard-healthcheck

[![Build Status](https://travis-ci.org/julie-ng/standard-healthcheck.svg?branch=master)](https://travis-ci.org/julie-ng/standard-healthcheck)
[![Test Coverage](https://api.codeclimate.com/v1/badges/d00bb74152c7914dccdd/test_coverage)](https://codeclimate.com/github/julie-ng/standard-healthcheck/test_coverage)
[![Maintainability](https://api.codeclimate.com/v1/badges/d00bb74152c7914dccdd/maintainability)](https://codeclimate.com/github/julie-ng/standard-healthcheck/maintainability)

This tiny library exposes a health check endpoint in a **standard response format** per Internet Engineering Task Force (IETF). The proposed standard includes a few properties not included in standard extensions:

- description
- version number (important for debugging)
- uptime
- details about dependent downstream services

### Example Output

Example JSON response from [https://nodejs-demo.onazure.io/health](https://nodejs-demo.onazure.io/health)

```json
{
  "status": "pass",
  "description": "A multipurpose dummy node.js app for cloud architecture demos",
  "version": "0.2.1",
  "details": {
    "uptime": {
      "component_type": "system",
      "observed_value": 74401.282209224,
      "human_readable": "0 days, 20 hours, 40 minutes, 1 seconds",
      "observed_unit": "s",
      "status": "pass",
      "time": "2020-02-20T13:05:11.307Z"
    },
    "env": {
      "WEBSITE_HOSTNAME": "azure-nodejs-demo.azurewebsites.net",
      "WEBSITE_INSTANCE_ID": "c33cdebf5b0f427fdd331f28322f183c95c5320c0c952d9194ad7ce9867c2eaa"
    }
  }
}
```

For details about schema, see [IETF draft document](https://tools.ietf.org/html/draft-inadarei-api-health-check-04).

## Usage


```
npm install --save standard-healthcheck
```

And then import the library in your [Express.js](https://expressjs.com/) application:

```javascript
const Healthcheck = require('standard-healthcheck')

const healthcheck = new Healthcheck({
	version: '1.0',
	description: 'My demo app',
	includeEnv: ['NODE_ENV']
})
```

And add the route to your app

```javascript
let app = express()
app.get('/health', healthcheck.endpoint)
```

### Optional: Environment variables

The proposed standard because is friendly for debugging. You can ask standard-healthcheck to output some environment variables (not recommended for production!) via the `includeEnv` optional property.

But it will ignore variables ending with `SECRET`, `PASSWORD`, and `_KEY` for security reasons.
