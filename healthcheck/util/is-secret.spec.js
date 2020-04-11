'use strict'

const isSecretHelper = require('./is-secret')

describe('Helper', () => {
	describe('isSecret()', () => {
		it('interprets variables ending in `_KEY` (with underscore, case-insensitive) as a secret', () => {
			expect(isSecretHelper('FOO_KEY')).toBe(true)
			expect(isSecretHelper('foo_key')).toBe(true)
			expect(isSecretHelper('fookey')).toBe(false)
		})

		it('interprets variables ending in `PASSWORD` (without underscore, case-insensitive) as a secret', () => {
			expect(isSecretHelper('FOO_PASSWORD')).toBe(true)
			expect(isSecretHelper('FOOPASSWORD')).toBe(true)
			expect(isSecretHelper('foo_password')).toBe(true)
			expect(isSecretHelper('foopassword')).toBe(true)
			expect(isSecretHelper('FOO_PASS')).toBe(true)
			expect(isSecretHelper('foo_pass')).toBe(true)
		})

		it('accept variables ending in `PASS` (without underscore, case-insensitive) NOT as a secret', () => {
			expect(isSecretHelper('MOUNTAINPASS')).toBe(false)
			expect(isSecretHelper('mountainpass')).toBe(false)
		})

		it('interprets variables ending in `_SECRET` (without underscore, case-insensitive) as a secret', () => {
			expect(isSecretHelper('FOO_SECRET')).toBe(true)
			expect(isSecretHelper('foo_secret')).toBe(true)
			expect(isSecretHelper('FOOSECRET')).toBe(true)
			expect(isSecretHelper('foosecret')).toBe(true)
		})
	})
})
