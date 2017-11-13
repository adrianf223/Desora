# Desora
Un proiect despre un ceas cu alarma.
Aplicația se poate folosi intr-o brutărie/pizzerie pentru pregătirea comenzilor,
sau acasa ca timer in gospodarie.

### Technologii folosite:
- Backend: Node.js, Express.js, MySql
- Dev: JavaScript/ES6, Webpack
- Frontend: HTML5, JQuery, Moment.js

### Instalare:
1. Download, install NodeJS: http://www.nodejs.org/
2. Download, install mysql: http://www.mysql.org/

3. Pe MySQL Creati baza de date: Desoradb
4. Un user: root cu password: dev!pass
sau reconfigurati appServer.js cu credentialele dorite.

5. Pentru ca sa se resolve de pe calculatorul local 
adresa configurata www.desora.ro editeaza 
/etc/hosts (sau in Windows C:\Windows\System32\drivers\etc\hosts ) cu:
127.0.0.1 www.desora.ro

6. Din directorul proiect:
  - Install project, run: npm install
  - Start web server, run: sudo npm start
  - Deschidere aplicatie: din chrome-browser www.desora.ro

`(OSX/Linux: Pentru ca rulam webserver-ul cu aplicatia pe portul 80 
avem nevoie de privilegii de administrator, acesate cu sudo)`

### Pentru pornirea direct din github:
Accesati: https://adrianf223.github.io/Desora/desora.ro/   
In acest mod legatura cu backend-ul si bazele de date nu va fi disponibila insa; 
datele se incarca static dintr-un exemplu.
