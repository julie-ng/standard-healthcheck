const schema = require('./schema')
const hasUptimeProps = require('./util/has-uptime-props')

describe ('schema', () => {
  it ('params are optional', () => {
    expect(() => {
      schema()
    }).not.toThrow()
  })

  describe ('response body', () => {
    let output

    beforeEach(() => {
      output = null
    })

    // uptime properties always included
    afterEach(() => {
      expect(hasUptimeProps(output.details.uptime)).toBe(true)
    })

    describe ('status', () => {
      it ('defaults to `pass`', () => {
        output = schema()
        expect(output.status).toEqual('pass')
      })

      it ('can be set', () => {
        output = schema({ status: 'fail' })
        expect(output.status).toEqual('fail')
      })
    })

    describe ('version', () => {
      it ('defaults to `unknown`', () => {
        output = schema()
        expect(output.version).toEqual('unknown')
      })

      it ('can be set', () => {
        output = schema({ version: '1.0' })
        expect(output.version).toEqual('1.0')
      })
    })
  })
})
