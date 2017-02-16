var express = require("express");
var bodyParser = require ("body-Parser");
var Scrape = require('./model/scrape.js');
var mongoose = require('mongoose');
var request = require('request');
var cheerio = require('cheerio');
var Promise = require('bluebird');

mongoose.Promise = Promise;

var app = express();

app.use(express.static('public'));

mongoose.connect("mongodb://localhost");
var db = mongoose.connection;


db.on('error', function(error) {
	console.log('Mongoose error: ', error);
})

db.once('open', function(){
	console.log('mongoose connection successful');
});


//routes
app.get('/', function(request, result){
	result.send('index.html');
	console.log('hit / path');
})

//scrape
app.get('/scrape', function(request, resutl){
	request('http://www.theverge.com/2017/2/15/14623572/nasa-space-launch-system-crewed-sls-flight-10-investigation', function(error, response, html) {

		var $ = cheerio.load(html);

		$('c-page-title').each(function(i, element){

			var result = {};

			result.title = $(this).children('a').text();
			result.link = $(this).children('a').attr('href');

			var entry = new Scrape(result);

			entry.save(function(error, docu) {
				if(error){
					console.log(error);
				} else {
					console.log(docu);
				}
			});
		});
	});

	result.send('Scrape Complete');
})


app.listen(3000, function(){
	console.log('App running on port 3000');
})