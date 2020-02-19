'use strict'
/* eslint-disable no-prototype-builtins */

module.exports = function (subj, opts, key) {
	if (opts.hasOwnProperty(key)) {
		subj[key] = opts[key]
	}
	return subj
}
