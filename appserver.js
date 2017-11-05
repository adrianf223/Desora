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

//Creare server
var appServer = express();

//Cream virtual hosts
var desoraHost = createVirtualHost("www.desora.ro", "desora");

//Use the virtual hosts
appServer.use(desoraHost);
// Setam parserul
appServer.use(bodyParser.urlencoded({
    extended: true
}));
appServer.use(bodyParser.json());

//CORS Middleware
appServer.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, contentType,Content-Type, Accept, Authorization");
    next();
});

//Pornim server. Porneste cu sudo start server pe mac din cauza restrictiilor pentru port 80
var port = 80;
appServer.listen(port, function () {
    console.log('Web serverul porneste pe port %d in mod %s ', port, appServer.settings.env);
});

appServer.use(express.static('node_modules/font-awesome/'));
appServer.use(express.static('node_modules/'));

appServer.use(express.static(path.join(application_root, 'desora.ro')));

// SELECT API
appServer.get('/alarme-data', function (req, res) {
    mysqlJson.query("SELECT * FROM Alarme", function (err, response) {
        if (err) console.warn(err);
        res.send(JSON.stringify(response));
    });
});

// INSERT API
appServer.post("/alarme-data/insert", function (req, res) {
    /* Insert Desoradb */
    // Exemplu: xINSERT INTO `Alarme` (`id`, `nume`, `moment`, `ore`, `minute`, `secunde`) 
    // VALUES (NULL, req.body.nume, req.body.ore, req.body.minute, req.body.secunde);
    mysqlJson.query("INSERT INTO `Alarme` (`id`, `nume`, `ore`, `minute`, `secunde`) VALUES (NULL, 'Nou', '0', '0', '0')",
        function (err, response) {
            if (err) console.log(err);
            res.send(JSON.stringify(response));
            // console.log(JSON.stringify(response));
            // console.dir(response);
        });
});

// UPDATE API
appServer.put("/alarme-data/update", function (req, res) {
    // console.log('update: ' + req.query);
    /* Update Desoradb */
    // Example: UPDATE `Alarme` SET `ore` = '0', `minute` = '0', `secunde` = '0' 
    // WHERE `id` = '2';
    mysqlJson.update('Alarme', {
            nume: req.query.nume,
            ore: req.query.ore,
            minute: req.query.minute,
            secunde: req.query.secunde
        }, {
            id: {
                operator: '=',
                value: req.query.id
            }
        },
        function (err, response) {
            if (err) console.warn(err);
            res.send(JSON.stringify(response));
            // console.log(response);
        });
});

// DELETE API
appServer.delete("/alarme-data/delete", function (req, res) {
    // console.dir('stergem ' + req.query);
    /* Delete row Desoradb */
    // DELETE FROM `Alarme` WHERE `id` IN ('6');
    mysqlJson.delete('Alarme', {
        id: {
            operator: '=',
            value: req.query.id
        }
    }, function (err, response) {
        if (err) console.log(err);
        // console.log(response);
        res.send(JSON.stringify(response));
    });
});