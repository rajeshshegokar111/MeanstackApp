var mongoose = require('mongoose');

module.exports = mongoose.model('Note', {
	text : String,
	done : Boolean
});