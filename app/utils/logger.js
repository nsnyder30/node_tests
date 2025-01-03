const pino = require('pino');

const logger = pino({
	level: process.env.LOG_LEVEL || 'info', 
	transport: process.env.NODE_ENV === 'development' ? {
		target: 'pino-pretty', 
		options: {
			colorize: true, 
			translateTime: 'SYS:standard', 
		}, 
	} : undefined, 
	serializers: {
		err: (error) => ({
			message: error.message, 
			stack: error.stack.split('\n'), 
			context: error.context || null, 
			statusCode: error.statusCode || 500
		})
	}
});

module.exports = logger;
