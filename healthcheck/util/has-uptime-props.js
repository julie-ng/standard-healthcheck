module.exports = function (obj = {}) {
	const props = [
		'component_type',
		'observed_value',
		'observed_unit',
		'status',
		'time'
	]
	for (const p of props) {
		if (!obj.hasOwnProperty(p)) {
			return false
		}
	}
	return true
}
