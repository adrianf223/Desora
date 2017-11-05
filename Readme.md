Un proiect despre un ceas cu alarma, numit Desora.
Aplicația se poate folosi intr-o brutărie/pizzerie pentru pregătirea comenzilor,
sau acasa ca timer in gospodarie.

Backend: Node.js, Express.js, MySql
Dev: JavaScript/ES6, Webpack
Frontend: HTML5, JQuery, Moment.js

Download, install NodeJS: http://www.nodejs.org/
Download, install mysql: http://www.mysql.org/

Pe MySQL Creati baza de date: Desoradb
un user: root cu password: dev!pass
sau reconfigurati appServer.js cu credentialele dorite.

Pentru ca sa se resolve de pe calculatorul local 
adresa configurata www.desora.ro editeaza 
/etc/hosts (sau in Windows C:\Windows\System32\drivers\etc\hosts ) cu:
127.0.0.1 www.desora.ro

Din directorul proiect:
Install project, run: npm install
Start web server, run: sudo npm start
Deschidere aplicatie: din chrome-browser www.desora.ro

(Pentru ca rulam webserver-ul cu aplicatia pe portul 80 
avem nevoie de privilegii de administrator, acesate cu sudo)