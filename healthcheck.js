'use strict'
/* eslint-disable no-prototype-builtins */

class Healthcheck {
	constructor (opts = {}) {
		this.props = { ...opts }
		this.endpoint =	this.endpoint.bind(this)
	}

	endpoint (req, res) {
		let body = {
			status: 'pass'
		}

		_extend(body, this.props, 'description')

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
				if (!_isSecret(envVar)) {
					body.details.env[envVar] = process.env[envVar]
				}
			})
		}
		res.json(body)
	}
}

function _extend (subj, opts, key) {
	if (opts.hasOwnProperty(key)) {
		subj[key] = opts[key]
	}
	return subj
}

function _isSecret (varname) {
	const norm = varname.toUpperCase()
	return (norm.endsWith('_KEY') || norm.endsWith('_SECRET') || norm.endsWith('_PASSWORD'))
}

module.exports = Healthcheck
