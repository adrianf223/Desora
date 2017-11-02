// Module dependencies.
var express = require('express');
var vhost = require('vhost');
var path = require('path');
var MysqlJson = require('mysql-json');
var bodyParser = require("body-parser");
var application_root = __dirname;


// db Initialization 
var mysqlJson = new MysqlJson({
    host: '127.0.0.1',
    user: 'root',
    password: 'dev!pass',
    database: 'Desoradb'
});


function createVirtualHost(domainName, dirPath) {
    return vhost(domainName, express.static(dirPath));
};

//Create server
var appServer = express();

//Create the virtual hosts
var desoraHost = createVirtualHost("www.desora.ro", "desora");

//Use the virtual hosts
appServer.use(desoraHost);
// Setting Base directory
appServer.use(bodyParser.json());

//CORS Middleware
appServer.use(function (req, res, next) {
    //Enabling CORS 
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, contentType,Content-Type, Accept, Authorization");
    next();
});

//Start server. Please sudo start server under osx due to port 80 platform security rules
var port = 80;
appServer.listen(port, function () {
    console.log('Web serverul porneste pe port %d in mod %s ', port, appServer.settings.env);
});

// appServer.use(express.static('node_modules/jquery/dist/'));
appServer.use(express.static('node_modules/font-awesome/'));
// appServer.use(express.static('node_modules/moment/min/'));
appServer.use(express.static('node_modules/'));

appServer.use(express.static(path.join(application_root, 'desora.ro')));

appServer.get('/alarme-data', function (req, res) {
    mysqlJson.query("SELECT * FROM Alarme", function (err, response) {
        if (err) throw err;
        res.send(JSON.stringify(response));
    });
});

//POST API
appServer.post("/alarme-data/nou ", function (req, res) {
    /* Insert Desoradb */
    // INSERT INTO `Alarme` (`id`, `nume`, `moment`, `ore`, `minute`, `secunde`) 
    // VALUES (NULL, req.body.nume, '12:00:00', req.body.ore, req.body.minute, req.body.secunde);
    mysqlJson.insert('Alarme', {
        id: NULL,
        nume: req.body.nume,
        moment: '12:00:00',
        ore: req.body.ore,
        minute: req.body.minute,
        secunde: req.body.secunde
    }, function (err, response) {
        if (err) throw err;
        console.log(response);
    });
});

//PUT API
appServer.put("/alarme-data:id", function (req, res) {
    /* Update Desoradb */
    // UPDATE `Alarme` SET `ore` = '0', `minute` = '0', `secunde` = '0' 
    // WHERE `id` = '1';
    mysqlJson.update('Alarme', {
            nume: req.body.nume,
            ore: req.body.ore,
            minute: req.body.minute,
            secunde: req.body.secunde
        }, {
            id: {
                operator: '=',
                value: req.body.id
            }
        },
        function (err, response) {
            if (err) throw err;
            console.log(response);
        });
});

// DELETE API
appServer.delete("/alarme-data:id", function (req, res) {
    /* Delete row Desoradb */
    // DELETE FROM `Alarme` WHERE `id` IN ('6');
    mysqlJson.delete('Alarme', {
        id: {
            operator: '=',
            value: req.body.id
        }
    }, function (err, response) {
        if (err) throw err;
        console.log(response);
    });
});




appServer.get('/multimedia-data', function (req, res) {
    mysqlJson.query("SELECT * FROM Multimedia", function (err, response) {
        if (err) throw err;
        res.send('<H1>Aici punem multimedia</H1><BR/>' + JSON.stringify(response));
    });
});