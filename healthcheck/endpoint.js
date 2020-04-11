/* eslint-disable no-prototype-builtins */
'use strict'
const extractEnv = require('./extract-env')
const schema = require('./schema')
const utils = require('./util')

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
