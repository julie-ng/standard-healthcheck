'use strict'

module.exports = function (varname) {
	const norm = varname.toUpperCase()
	return (norm.endsWith('_KEY') || norm.endsWith('SECRET') || norm.endsWith('PASSWORD'))
}
