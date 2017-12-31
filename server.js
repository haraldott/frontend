'use strict';

var express = require('express');
var hogan  = require('hogan-express');
var http_module = require('http');
var cors = require('cors');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors({credentials: true, origin: true}));
app.engine('html', hogan);
app.set('view engine', 'pug');
app.set('views', __dirname + '/views');
app.set('port', process.env.PORT || 4000);
app.use(express.static(__dirname + '/public'));
app.set('trust proxy', 1); // trust first proxy

const partials = {
  header: 'partials/header',
  footer: 'partials/footer'
};

require('./routes')(app, partials);

const http = http_module.Server(app);

http.listen(app.get('port'), () => {
  console.info('Running on http://localhost:%s', app.get('port'));
});

module.exports = app;