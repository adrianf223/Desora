import $ from "jquery";
import moment from 'moment-es6';
import {Ceas} from './ceas.js'

class App {
	constructor() {

		// Cache some selectors
		let ceas = new Ceas();
		ceas.adaugaSegmente();
		ceas.adaugaZileleSaptamanii();

		// This will hold the number of seconds left
		// until the alarm should go off
		let secundeDeScurs = -1;

		// Run a timer every second and update the clock

		(function actualizare() {
			// actualizareEcran(ceas.segmente, ceas.numeleCifrelor, ceas);
			ceas.actualizareEcran();

			// Is there an alarm set?
			if (secundeDeScurs > 0) {
				// Decrement the counter with one second
				secundeDeScurs--;

				// Activate the alarm icon
				ceas.alarma.addClass('active');
			} else if (secundeDeScurs == 0) {

				timpulAExpirat.fadeIn();

				// Play the alarm sound. This will fail
				// in browsers which don't support HTML5 audio
				try {
					$('#sunatoare')[0].play();
				} catch (e) {}

				secundeDeScurs--;
				ceas.alarma.removeClass('active');
			} else {
				// The alarm has been cleared
				ceas.alarma.removeClass('active');
			}

			// Schedule this function to be run again in 1 sec
			setTimeout(actualizare, 1000);

		})();


		let msgSetareAlarma = $('#msg-alarma').parent();
		let setareAlarma = $('#alarma-setare');
		let stergereAlarma = $('#alarma-stergere');
		let timpulAExpirat = $('#timpul-a-expirat').parent();


		// Handle setting and clearing alamrs
		$('.buton-setare').click(function () {

			// Show the dialog
			msgSetareAlarma.trigger('show');

		});

		msgSetareAlarma.find('.inchide').click(function () {
			msgSetareAlarma.trigger('hide')
		});

		msgSetareAlarma.click(function (element) {

			// When the overlay is clicked, 
			// hide the dialog.
			if ($(element.target).is('panou-alarma')) {
				// This check is need to prevent
				// bubbled up events from hiding the dialog
				msgSetareAlarma.trigger('hide');
			}
		});


		setareAlarma.click(function () {

			var eNumarValid = true;
			var secundeSetate = 0;
			var maxSecunde = [3600, 60, 1];

			msgSetareAlarma.find('input').each(function (indexCamp, nrIntrodus) {

				// Using the validity property in HTML5-enabled browsers:

				if (nrIntrodus.validity && !nrIntrodus.validity.valid) {
					// The input field contains something other than a digit,
					// or a number less than the min value

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
		});

		// Custom events to keep the code clean
		msgSetareAlarma.on('hide', function () {
			msgSetareAlarma.fadeOut();
		}).on('show', function () {

			// Calculate how much time is left for the alarm to go off.
			var ore = 0;
			var minute = 0;
			var secunde = 0;
			var tmp = 0;

			if (secundeDeScurs > 0) {

				// There is an alarm set, calculate the remaining time
				tmp = secundeDeScurs;

				ore = Math.floor(tmp / 3600);
				tmp = tmp % 3600;

				minute = Math.floor(tmp / 60);
				tmp = tmp % 60;

				secunde = tmp;
			}

			// Update the input fields
			msgSetareAlarma.find('input').eq(0).val(ore).end().eq(1).val(minute).end().eq(2).val(secunde);
			msgSetareAlarma.fadeIn();

		});

		timpulAExpirat.click(function () {
			timpulAExpirat.fadeOut();
		});

	}
}

let app = new App();

