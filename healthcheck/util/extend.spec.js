'use strict'

const extendHelper = require('./extend')

describe('Helper', () => {
	describe('extend()', () => {
		let opts
		let subject

		beforeEach(() => {
			subject = {
				a: 'b'
			}
			opts = {
				hello: 'world',
				foo: 'bar'
			}
		})

		describe('key exists in options', () => {
			it('adds keys to target object', () => {
				expect(extendHelper(subject, opts, 'hello')).toEqual({
					a: 'b',
					hello: 'world'
				})
			})
		})

		describe('key does NOT exists in options', () => {
			it('does not affect target object', () => {
				expect(extendHelper(subject, opts, 'nothing')).toEqual({
					a: 'b'
				})
			})
		})
	})
})
