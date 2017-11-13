import $ from "jquery";
import moment from 'moment-es6';
import {
	Ceas
} from './ceas.js'

class App {
	constructor() {

		let alarme = '';
		let alarmeData;
		let avemDatabase = false;

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

			// console.log("afisam tabel");

			// Dupa discutia cu Matei se cere ca sa incarce datele dintr-un
			// fisier local daca nu ruleaza de pe site-ul initial.
			// Nota aici, aplicatia va functiona in acest caz partial...
			// Hack: daca lansam applicatia de pe alt site decat cel cu db-ul incarca un json local
			if (window.location.host == 'www.desora.ro') {
				alarmeData = "alarme-data";
				avemDatabase = true;
			} else {
				alarmeData = "alarmeData.json";
				avemDatabase = false;
				msgSetareAlarma.find('#alarme').append(`
				<div id="mockup">Fara conexiune la baza de date. Se incarca date de test.</div>
				`);				
			}

			// luam lista json de la server cu alarme
			$.getJSON(alarmeData, function (data) {

				// var text = JSON.stringify(data);
				console.log(JSON.stringify(data));


				alarme = `
				<div id="loc-tabel" class="tabel-editabil">
				<span class="adauga-linie fa fa-plus-square">Add</span>
				<table class="tabel">
				  <tr>
				    <th class="idascuns">ID</th>				  
					<th>Nume</th>
					<th>Ore</th>
					<th>Minute</th>
					<th>Secunde</th>
					<th>Stergere</th>
				  </tr>
					${data.map(d => `
					<tr>
					  <td class="idascuns">${d.id}</td>
					  <td contenteditable="true">${d.nume}</td>
					  <td contenteditable="true">${d.ore}</td>
					  <td contenteditable="true">${d.minute}</td>
					  <td contenteditable="true">${d.secunde}</td>
					  <td>
						<span class="sterge-linie fa fa-trash-o"></span>
					  </td>
					</tr>					
					`).join('')}
					<tr class="hide">
					<td class="idascuns"></td>					
					<td contenteditable="true">Nou</td>
					<td contenteditable="true">0</td>
					<td contenteditable="true">0</td>
					<td contenteditable="true">0</td>
					<td>
					  <span class="sterge-linie fa fa-trash-o"></span>
					</td>
				  </tr>
				</table>
			  </div>
			</div>	`;

				msgSetareAlarma.find('#alarme').append(alarme);

				$('.adauga-linie').click(function () {
					var tabel = $('#loc-tabel');
					var randNou = tabel.find('tr.hide').clone(true).removeClass('hide table-line');
					tabel.find('table').append(randNou);

					if (avemDatabase) {
						$.post("alarme-data/insert", {
							operation: "insert"
						}, function (data, status) {
							randNou[0].children[0].innerText = JSON.parse(data).insertId;
						});
					}

				});

				$('.sterge-linie').click(function (rand) {
					let idDeSters = rand.currentTarget.parentElement.parentElement.children[0].innerText;
					// console.log(idDeSters);

					let url = 'alarme-data/delete';
					if (avemDatabase) {
						$.ajax({
							url: url + '?' + $.param({
								"id": idDeSters
							}),
							type: 'DELETE',
						});
					}
					$(this).parents('tr').detach();
				});

				$("table tr").click(function (rand) {
					$(rand).addClass('selected').siblings().removeClass('selected');
					// var value=$(this)[0];
					// console.dir(value);  
					var tr = $(this);
					let id = tr[0].cells[0].innerText;
					let nume = tr[0].cells[1].innerText;
					let ore = tr[0].cells[2].innerText;
					let minute = tr[0].cells[3].innerText;
					let secunde = tr[0].cells[4].innerText;

					// Adaugam id ore minute secunde de pe pos 0,2,3,4
					// $("#id").val(id);
					$("#ore").val(ore);
					$("#minute").val(minute);
					$("#secunde").val(secunde);

					let url = 'alarme-data/update';
					if (avemDatabase) {
						$.ajax({
								url: url + '?' + $.param({
									"id": id,
									"nume": nume,
									"ore": ore,
									"minute": minute,
									"secunde": secunde
								}),
								type: 'PUT',
							}).done(function () { /* console.info( "success update "); */ })
							.fail(function () { /* console.warn( "error update" ); */ })
							.always(function () { /*console.log( "complete update"); */ });
					}
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