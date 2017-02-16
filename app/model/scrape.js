var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var scrapeSchema = new Schema({

	title:{
		type: String,
		required: true
	},

	link: {
		type: String,
		required: true
	}
});

var Scrape = mongoose.model('Scrape', scrapeSchema);

module.exports = Scrape;