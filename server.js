let express = require('express');
let mainPageController = require('./controllers/mainPageController');
let weatherPage = require('./controllers/weatherController');
let serverApp = express();

serverApp.set('view engine', 'ejs');

//static files directories
serverApp.use(express.static('./public/main'));
serverApp.use('/weather',express.static('public/weather'));

//fire controllers and set up directories
mainPageController(serverApp);
//weatherPage(serverApp);

//get port and fire server
let port = process.env.PORT || 3000;
serverApp.listen(port);
console.log("server listening to port "+port+".");