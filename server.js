let express = require('express');

let serverApp = express();

serverApp.set('view engine', 'ejs');

serverApp.use(express.static('./public'));

serverApp.listen(3000);
console.log("server listening to port 3000...");