/* eslint-disable no-prototype-builtins */
'use strict'
const extractEnv = require('./extract-env')
const schema = require('./schema')
const utils = require('./util')

// class Healthcheck {
// 	constructor (opts = {}) {
// 		this.props = { ...opts }
// 		this.endpoint =	this.endpoint.bind(this)
// 	}

// 	endpoint (req, res) {
// 		let body = {
// 			status: 'pass'
// 		}

// 		// utils.extend(body, this.props, 'description')

// 		// const uptimeSeconds = process.uptime()
// 		// body = {
// 		// 	...body,
// 		// 	version: this.props.version || 'unknown',
// 		// 	details: {
// 		// 		uptime: {
// 		// 			component_type: 'system',
// 		// 			observed_value: uptimeSeconds,
// 		// 			human_readable: utils.humanUptime(uptimeSeconds),
// 		// 			observed_unit: 's',
// 		// 			status: 'pass',
// 		// 			time: new Date()
// 		// 		}
// 		// 	}
// 		// }

// 		if (this.props.includeEnv) {
//       body.details.env = extractEnv(this.props.includeEnv)
// 		}
// 		res.json(body)
// 	}
// }

/**
 * Health check Endpoint
 *
 * @param {Object} [opts = {}] options
 * @param {String} [opts.status = 'pass'] application health. Standard status values include `pass`, `fail`, and `warn`.
 * @param {String} [opts.description] app description
 * @param {String} [opts.version] app version
 * @param {String[]} [opts.includeEnv] list of environment variables to include in output
 * @returns {function} endpoint with standard express.js interface: `function(req, res) {…}`
 */
function healthcheck (opts = {}) {
  const body = schema(opts)
  const endpoint = function (req, res) {
		if (opts.includeEnv) {
      body.details = body.details || {}
      body.details.env = extractEnv(opts.includeEnv)
		}
		res.json(body)
  }
  return endpoint
}

module.exports = healthcheck
