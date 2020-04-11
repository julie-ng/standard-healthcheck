module.exports = function (uptime) {
	const days = Math.floor(uptime / 60 / 60 / 24)
	const hours = Math.floor(uptime / 60 / 60) - (days * 24)
	const minutes = Math.floor(uptime / 60) - (hours * 60)
	const seconds = uptime % 60
	return `${days} days, ${hours} hours, ${minutes} minutes, ${Math.floor(seconds)} seconds`
}
