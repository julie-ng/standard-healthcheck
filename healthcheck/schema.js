'use strict'
const utils = require('./util')

/**
 * Endpoint response schema per [IETF definition for healthcheck  endpoints]
 * (https://tools.ietf.org/html/draft-inadarei-api-health-check-04)
 *
 * @params {Object} [body = {}] base schema
 * @params {String} [body.version = 'unknown'] application version number
 * @reutrns {Object} base schema
 */
function schema (body = {}) {
	body.status = body.status || 'pass'
	body.version = body.version || 'unknown'

	const uptimeSeconds = process.uptime()

	return {
		...body,
		details: {
			uptime: {
				component_type: 'system',
				observed_value: uptimeSeconds,
				human_readable: utils.humanUptime(uptimeSeconds),
				observed_unit: 's',
				status: 'pass',
				time: new Date()
			}
		}
	}
}

module.exports = schema
