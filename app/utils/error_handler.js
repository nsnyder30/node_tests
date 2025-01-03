const pino = require('pino-http');
const logger = require('./logger');

module.exports = function handleError(err, req, res, next) {
	logger.error({ err });

	console.error(err.stack);
	const statusCode = err.statusCode  || 500;
	const message = err.message || 'An unexpected error occurred';
	const context = err.context || {};

	res.status(statusCode).json({
		success: false, 
		message, 
		input_data, 
		...(process.env.NODE_ENV === 'development' && {stack: err.stack}), 
	});
};
