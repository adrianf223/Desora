import $ from "jquery";
// import './node_modules/jquery-ui/themes/base/core.css';
// import './node_modules/jquery-ui/themes/base/theme.css';
// import './node_modules/jquery-ui/themes/base/selectable.css';
// import './node_modules/jquery-ui/ui/core';
// import './node_modules/jquery-ui/ui/widgets/selectable';
import moment from 'moment-es6';
import {
	Ceas
} from './ceas.js'

class App {
	constructor() {

		let alarme = '';

		let ceas = new Ceas();
		ceas.adaugaSegmente();
		ceas.adaugaZileleSaptamanii();

		// Memoreaza nr de secunde pana la declasarea alarmei
		let secundeDeScurs = -1;

		// Porneste un timer in fiecare secunda si reinprospateaza ceasul
		(function actualizare() {
			// actualizareEcran(ceas.segmente, ceas.numeleCifrelor, ceas);
			ceas.actualizareEcran();

			// verificare daca avem alarma setata
			if (secundeDeScurs > 0) {
				// Decrementam cu o secunda
				secundeDeScurs--;

				//activam icon display alarma
				ceas.alarma.addClass('active');
			} else if (secundeDeScurs == 0) {

				timpulAExpirat.fadeIn();

				// Declanseaza sunetul alarmei doar in html5
				try {
					$('#sunatoare')[0].play();
				} catch (e) {}

				secundeDeScurs--;
				ceas.alarma.removeClass('active');
			} else {
				// Alarma a fost desetata
				ceas.alarma.removeClass('active');
			}

			// Ruleaza functia aceasta iar in 1 secunda
			setTimeout(actualizare, 1000);

		})();


		let msgSetareAlarma = $('#msg-alarma').parent();
		let setareAlarma = $('#alarma-setare');
		let stergereAlarma = $('#alarma-stergere');
		let timpulAExpirat = $('#timpul-a-expirat').parent();


		// Event handleri pentru setare alarme
		$('.buton-setare').click(function () {

			// Aratam mesajul de dialog
			msgSetareAlarma.trigger('show');

			console.log("afisam tabel");

			// luam lista json de la server cu alarme
			$.getJSON("http://www.desora.ro/alarme-data", function (data) {
				var text = JSON.stringify(data);
				console.log(data);
				alarme = `
				<div id="loc-tabel" class="tabel-editabil">
				<span class="adauga-linie">+</span>
				<table class="tabel">
				  <tr>
					<th>Nume</th>
					<th>Ore</th>
					<th>Minute</th>
					<th>Secunde</th>
					<th>Stergere/Adaugare</th>
				  </tr>
					${data.map(d => `
					</tr>
					<tr>
					  <td contenteditable="true">${d.nume}</td>
					  <td contenteditable="true">${d.ore}</td>
					  <td contenteditable="true">${d.minute}</td>
					  <td contenteditable="true">${d.secunde}</td>
					  <td>
						<span class="sterge-linie">-</span>
					  </td>
					</tr>					
					`).join('')}
					<tr class="hide">
					<td contenteditable="true">Nou</td>
					<td contenteditable="true">0</td>
					<td contenteditable="true">0</td>
					<td contenteditable="true">0</td>
					<td>
					  <span class="sterge-linie">-</span>
					</td>
				  </tr>
				</table>
			  </div>
			</div>	`;

				msgSetareAlarma.find('#alarme').append(alarme);

				var tabel = $('#loc-tabel');
				
				$('.adauga-linie').click(function () {
				  var cloneaza = tabel.find('tr.hide').clone(true).removeClass('hide table-line');
				  tabel.find('table').append(cloneaza);
				});
				
				$('.sterge-linie').click(function () {
				  $(this).parents('tr').detach();
				});
			});
		});

		msgSetareAlarma.find('.inchide').click(function () {
			msgSetareAlarma.trigger('hide')
			alarme = '';
		});

		msgSetareAlarma.click(function (element) {

			// Inchide dialogul cand dam click
			if ($(element.target).is('panou-alarma')) {
				// Verificare propagare evenimente pentru prevenire inchidere
				msgSetareAlarma.trigger('hide');
				alarme = '';
				msgSetareAlarma.find('#alarme').empty();
			}
		});


		setareAlarma.click(function () {

			var eNumarValid = true;
			var secundeSetate = 0;
			var maxSecunde = [3600, 60, 1];

			msgSetareAlarma.find('input').each(function (indexCamp, nrIntrodus) {

				// Folosim proprietatea validity din html5 
				if (nrIntrodus.validity && !nrIntrodus.validity.valid) {
					// Verificam daca campul e valid
					eNumarValid = false;
					nrIntrodus.focus();

					return false;
				}

				secundeSetate += maxSecunde[indexCamp] * parseInt(parseInt(nrIntrodus.value));
			});

			if (!eNumarValid) {
				alert('Introduce-ti va rog un numer valid!');
				return;
			}

			if (secundeSetate < 1) {
				alert('Alegeti va rog un moment in viitor!');
				return;
			}

			secundeDeScurs = secundeSetate;
			msgSetareAlarma.trigger('hide');
		});

		stergereAlarma.click(function () {
			secundeDeScurs = -1;
			msgSetareAlarma.trigger('hide');
			msgSetareAlarma.find('#alarme').empty();
		});

		// Evenimente pentru a suplini codul
		msgSetareAlarma.on('hide', function () {
			msgSetareAlarma.fadeOut();
			msgSetareAlarma.find('#alarme').empty();

		}).on('show', function () {

			// Calculare timp disponibil pana la declansare alarma
			var ore = 0;
			var minute = 0;
			var secunde = 0;
			var tmp = 0;

			if (secundeDeScurs > 0) {

				// Daca avem alarma activata calculeaza timpul ramas
				tmp = secundeDeScurs;

				ore = Math.floor(tmp / 3600);
				tmp = tmp % 3600;

				minute = Math.floor(tmp / 60);
				tmp = tmp % 60;

				secunde = tmp;
			}

			// Reimprospatare campuri
			msgSetareAlarma.find('input').eq(0).val(ore).end().eq(1).val(minute).end().eq(2).val(secunde);
			msgSetareAlarma.fadeIn();

		});

		timpulAExpirat.click(function () {
			timpulAExpirat.fadeOut();
		});

	}
}

let app = new App();