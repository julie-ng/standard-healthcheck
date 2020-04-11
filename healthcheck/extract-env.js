'use strict'
const utils = require('./util')

/**
 * Extracts environment variables, ignoring secret-like keys.
 *
 * @param {String[]} keys - Array of environment variables to extract
 * @returns {Object} key value pair of environment variables
 */
function extractEnv (keys) {
 const vars = {}

  keys.forEach((envVar) => {
    if (!utils.isSecret(envVar)) {
      vars[envVar] = process.env[envVar]
    }
  })

  return vars
}

module.exports = extractEnv