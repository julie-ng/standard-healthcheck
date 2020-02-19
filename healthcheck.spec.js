/* eslint-disable no-prototype-builtins */
'use strict'

const Healthcheck = require ('./healthcheck')

describe ('Healthcheck', () => {
	let mockReq
	let mockRes
	let mockResBody

	beforeEach (() => {
		mockReq = {}
		mockResBody = jest.fn ()
		mockRes = {
			json: mockResBody
		}
	})

	afterEach (() => {
		mockResBody.mockReset ()
	})

	describe ('Custom params', () => {
		let healthcheck
		let body

		beforeEach (() => {
			healthcheck = new Healthcheck ({
				description: 'my healthcheck',
				custom: 'prop'
			})
			healthcheck.endpoint (mockReq, mockRes)
			body = mockResBody.mock.calls[0][0]
		})

		it ('has a base object', () => {
			expect (_hasDetailsObj (body)).toBe (true)
		})

		describe ('`version`', () => {
			it ('accepts version object', () => {
				const hc = new Healthcheck ({
					description: 'hc',
					version: '1.0'
				})

				hc.endpoint (mockReq, mockRes)
				const body = mockResBody.mock.calls[1][0]

				expect (body.description).toEqual ('hc')
				expect (body.version).toEqual ('1.0')
			})

			it ('ouputs `unknown` version if none provided', () => {
				expect (body.version).toEqual ('unknown')
			})
		})
	})

	describe ('Optional Environment Variables', () => {
		pending ('accepts optional `includeEnv` param to extend response body')
	})
})

function _hasDetailsObj (body) {
	return body.hasOwnProperty ('details') &&
		body.details.hasOwnProperty ('uptime') &&
		_hasUptimeProps (body.details.uptime)
}

function _hasUptimeProps (obj) {
	const props = [
		'component_type',
		'observed_value',
		'observed_unit',
		'status',
		'time'
	]
	for (const p of props) {
		if (!obj.hasOwnProperty (p)) {
			return false
		}
	}
	return true
}
