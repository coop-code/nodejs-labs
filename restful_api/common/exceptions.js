var constants = require ('/const.js');

function NotFoundException (message) {
	this.message = message;
	this.status = constants.HTTP_NOT_FOUND;
}

function BadRequestException (message) {
	this.message = message;
	this.status = constants.HTTP_BAD_REQUEST;
}

exports.NotFoundException = NotFoundException;
exports.BadRequestException = BadRequestException;