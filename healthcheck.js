/* eslint-disable no-prototype-builtins */
'use strict'
const utils = require('./util')

class Healthcheck {
	constructor (opts = {}) {
		this.props = { ...opts }
		this.endpoint =	this.endpoint.bind(this)
	}

	endpoint (req, res) {
		let body = {
			status: 'pass'
		}

		utils.extend(body, this.props, 'description')

		body = {
			...body,
			version: this.props.version || 'unknown',
			details: {
				uptime: {
					component_type: 'system',
					observed_value: process.uptime(),
					observed_unit: 's',
					status: 'pass',
					time: new Date()
				}
			}
		}

		if (this.props.includeEnv) {
			body.details.env = {}
			this.props.includeEnv.forEach((envVar) => {
				if (!utils.isSecret(envVar)) {
					body.details.env[envVar] = process.env[envVar]
				}
			})
		}
		res.json(body)
	}
}

module.exports = Healthcheck
