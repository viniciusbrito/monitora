var express = require('express')
    ,app = express()
    ,bodyParser = require('body-parser')
    ,routes = require('../app/routes');

app.use(express.static('./public'));
app.use('/bootstrap', express.static('./node_modules/bootstrap/dist/'));
app.use('/bootstrap-switch', express.static('./node_modules/angular-bootstrap-toggle-switch/dist/'));
app.use('/js/lib', express.static('./node_modules/angular/'));
app.use('/js/lib', express.static('./node_modules/angular-route/'));
app.use('/js/lib', express.static('./node_modules/angular-resource/'));
app.use('/js/lib', express.static('./node_modules/angular-sanitize/'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

routes(app);

module.exports = app;