module.exports = {
	init: function() {
		var client = this
		function isClient(name) {
			var agent = window.navigator.userAgent,
				index = agent.indexOf(name)
			if (index < 0) { return false }
			client.version = parseInt(agent.substr(index + name.length + 1))
			client.name = name
			return true
		}
		client.isIE = isClient('MSIE')
		client.isFirefox = isClient('Firefox')
		client.isWebkit = client.isWebKit = isClient('WebKit')
		client.isChrome = isClient('Chrome')
		client.isSafari = !client.isChrome && isClient('Safari')
	},

	isQuirksMode: function(doc) {
		// in IE, if compatMode is undefined (early ie) or explicitly set to BackCompat, we're in quirks
		return this.isIE && (!doc.compatMode || doc.compatMode == 'BackCompat')
	}
}

module.exports.init()