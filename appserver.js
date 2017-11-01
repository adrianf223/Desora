// Module dependencies.
var express = require('express');
var vhost = require('vhost');
var path = require('path');
var MysqlJson = require('mysql-json');
var application_root = __dirname;


// db Initialization 
var mysqlJson = new MysqlJson({
    host:'127.0.0.1',
    user:'root',
    password:'dev!pass',
    database : 'Desoradb'
});   


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
    console.log('Web serverul porneste pe port %d in mod %s ', port, appServer.settings.env);
});

appServer.use(express.static('node_modules/jquery/dist/'));
appServer.use(express.static('node_modules/moment/min/'));
appServer.use(express.static(path.join(application_root,'desora.ro')));

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


