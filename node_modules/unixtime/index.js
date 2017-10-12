"use strict";

module.exports = function unixtime(date) {
	if (date === undefined) {
		date = Date.now();
	}

	return (date / 1000) >>> 0;
};

if (require.main === module) {
	console.log(module.exports());
}
