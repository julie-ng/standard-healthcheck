/* eslint-disable no-prototype-builtins */
'use strict'

const healthcheck = require('./endpoint')
const util = require('./util')

describe('healthcheck endpoint', () => {
	let mockReq
	let mockRes
	let mockResBody
	let result

	beforeEach(() => {
		mockReq = {}
		mockResBody = jest.fn()
		mockRes = {
			json: mockResBody
		}
	})

	afterEach(() => {
		expect(_hasDetailsObj(result)).toBe(true)
		mockResBody.mockReset()
	})

	function _callEndpoint (opts) {
		const endpoint = healthcheck(opts)
		endpoint(mockReq, mockRes)
		return mockResBody.mock.calls[0][0]
	}

	describe('`status`', () => {
		it('defaults to `pass`', () => {
			result = _callEndpoint()
			expect(result.status).toEqual('pass')
		})

		it('can be set', () => {
			result = _callEndpoint({ status: 'fail' })
			expect(result.status).toEqual('fail')
		})
	})

	describe('`version`', () => {
		it('defaults to `unknown`', () => {
			result = _callEndpoint()
			expect(result.version).toEqual('unknown')
		})

		it('can be set', () => {
			result = _callEndpoint({ version: '1.0' })
			expect(result.version).toEqual('1.0')
		})
	})

	describe('Optional Environment Variables', () => {
		const originalEnv = process.env

		beforeEach(() => {
			jest.resetModules()
			process.env = { ...originalEnv }
		})

		// afterEach(() => {
		//   process.env = originalEnv
		// })

		it('accepts optional `includeEnv` param to extend response body', () => {
			process.env.FOO = 'bar'

			result = _callEndpoint({
				version: '1.0',
				includeEnv: ['FOO']
			})
			expect(result.details.env.FOO).toEqual('bar')
		})

		it('ignores "KEY"-like vars', () => {
			process.env.MONKEY = 'banana'
			process.env.MY_KEY = 'secret'

			result = _callEndpoint({
				includeEnv: ['MONKEY', 'MY_KEY']
			})
			expect(result.details.env.MONKEY).toEqual('banana')
			expect(result.details.env.MY_KEY).toBeUndefined()
		})

		it('ignores "SECRET"-like vars', () => {
			process.env.SECRETARY = 'helpful'
			process.env.ACCESS_SECRET = 'not-secure'

			result = _callEndpoint({
				includeEnv: ['SECRETARY', 'ACCESS_SECRET']
			})
			expect(result.details.env.SECRETARY).toEqual('helpful')
			expect(result.details.env.ACCESS_SECRET).toBeUndefined()
		})

		it('ignores "PASSWORD"-like vars', () => {
			process.env.PASSPORT = 'american'
			process.env.APP_PASSWORD = 'not-secure'
			process.env.APP_PASS = 'not-secure'

			result = _callEndpoint({
				includeEnv: ['PASSPORT', 'APP_PASSWORD', 'APP_PASS']
			})

			expect(result.details.env.PASSPORT).toEqual('american')
			expect(result.details.env.APP_PASSWORD).toBeUndefined()
			expect(result.details.env.APP_PASS).toBeUndefined()
		})
	})
})

function _hasDetailsObj (body) {
	return body.hasOwnProperty('details') &&
    body.details.hasOwnProperty('uptime') &&
    util.hasUptimeProps(body.details.uptime)
}
