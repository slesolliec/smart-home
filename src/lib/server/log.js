
// dependencies
import colors from 'colors/safe'


const log = {}


// gives memory used in Mega-Bytes
function memoryUsed() {
	const memory = Math.round(process.memoryUsage().heapUsed /1024 /1024 * 100).toString();
	if (memory.length < 4) {
		return ' ' + memory.slice(0,-2) + "." + memory.slice(-2) + "MB";
	} else {
		return memory.slice(0,-2) + "." + memory.slice(-2) + "MB";
	}
}


function logger(msg) {
	console.log(new Date().toISOString().replace('T', ' ').slice(0, -1), colors.bold(memoryUsed()), msg);
}


log.debug = function (msg) {
	logger(colors.cyan(msg))
}

log.info = function (msg) {
	logger(msg)
}

log.warning = function (msg) {
	logger( colors.yellow("[WARN] ") + msg)
}

log.error = function (msg, e) {
	// console.log(e);
	logger( colors.bold.red("[ERROR] ") + msg + (e || ''))
}

log.tuya = function (msg) {
	logger(colors.magenta(msg))
}

export default log
