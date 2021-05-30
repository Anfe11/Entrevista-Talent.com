const express = require('express'),
	morgan = require('morgan'),
	path = require('path');

const { getListOffers } = require('./controllers/offer.controller');

const app = express();


app.use(morgan('dev'));
app.use('/styles', express.static(__dirname + '/views'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('PORT', 3200);


app.get('/', async (req, res) => {
	const jobs = await getListOffers();
	res.render('index', { listOffers: jobs });
});

module.exports = app;
