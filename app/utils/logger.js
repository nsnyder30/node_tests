const pino = require('pino');
const { z } = require('zod');

const log_level_schema = z.enum(["fatal", "error", "warn", "info", "debug", "trace", "silent"]);
const logger = pino({
	level: process.env.LOG_LEVEL || 'info', 
	transport: process.env.NODE_ENV === 'development' ? {
		target: 'pino-pretty', 
		options: {
			colorize: true, 
			translateTime: 'SYS:standard', 
		}, 
	} : undefined, 
	formatters: {
		level: (label, number) => {
			return {level: label +' ('+number.toString()+')'};
		}
	}, 
	serializers: {
		err: (error) => ({
			message: error.message, 
			stack: error.stack.split('\n'), 
			context: error.context || null, 
			statusCode: error.statusCode || 500
		})
	}
});

module.exports = { logger, log_level_schema };
