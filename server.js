var express = require("express");
var bodyParser = require ("body-Parser");
var exphbs = require('express-handlebars');
var mongoose = require('mongoose');
var request = require('request');
var cheerio = require('cheerio');
var Promise = require('Bluebird');

mongoose.Promise = Promise;

var app = express();

app.use(express.static('public'));


app.listen(3000, function(){
	console.log('Appl running on port 3000');
})