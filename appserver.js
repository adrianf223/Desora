// Module dependencies.
var application_root = __dirname, 
express = require('express'),
vhost = require('vhost');
path = require('path');
    
    
function createVirtualHost(domainName, dirPath) {
    return vhost(domainName, express.static(dirPath));
}

//Create server
var appServer = express();

//Create the virtual hosts
var desoraHost = createVirtualHost("www.desora.ro", "desora");

//Use the virtual hosts
appServer.use(desoraHost);

//Start server. Please sudo start server under osx 
var port = 80;
appServer.listen(port, function() {

    console.log('Express server porneste pe port %d in %s mode', port, appServer.settings.env);
});

// db Initialization 
var MysqlJson = require('mysql-json');
var mysqlJson = new MysqlJson({
    host:'127.0.0.1',
    user:'root',
    password:'dev!pass',
    database : 'Desoradb'
});

appServer.use(express.static('dist'));
appServer.use(express.static('html'));
appServer.use(express.static('js'));
appServer.use(express.static('css'));
appServer.use(express.static('img'));
appServer.use(express.static('clase'));
appServer.use(express.static('node_modules/jquery/dist/'));
appServer.use(express.static('node_modules/traceur/bin/'));
appServer.use(express.static('node_modules/es6-module-loader/dist/'));
appServer.use(express.static('node_modules/material-design-lite/dist/'));
appServer.use(express.static('node_modules/jquery/dist/'));
appServer.use(express.static('node_modules/systemjs/dist/'));

// appServer.use(express.static(path.join(__dirname,'dist')));


appServer.get('/alarme-data', function(req, res) {   
    mysqlJson.query("SELECT * FROM Alarme", function(err, response) {
        if (err) throw err;
        res.send('<H1>Aici punem alarme</H1><BR/>' + JSON.stringify(response));
      });
});


appServer.get('/multimedia-data', function(req, res) {
    mysqlJson.query("SELECT * FROM Multimedia", function(err, response) {
        if (err) throw err;
        res.send('<H1>Aici punem multimedia</H1><BR/>' + JSON.stringify(response));
      });
});
