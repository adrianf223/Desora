$(function(){

	// Cache some selectors

	var ceas = $('#ceas');
	var	alarma = ceas.find('.alarma');
	var	zinoapte = ceas.find('.zinoapte');
	var	msgSetareAlarma = $('#msg-alarma').parent();
	var	setareAlarma = $('#alarma-setare');
	var	stragereAlarma = $('#alarma-stergere');
	var	timpulAExpirat = $('#time-is-up').parent();

	// This will hold the number of seconds left
	// until the alarm should go off
	var secundeDeScurs = -1;

	// Map digits to their names (this will be an array)
	var numeleCifrelor = 'zero one two three four five six seven eight nine'.split(' ');

	// This object will hold the digit elements
	var cifre = {};

	// Positions for the hours, minutes, and seconds
	var pozitii = ['h1', 'h2', ':', 'm1', 'm2', ':', 's1', 's2'];

	// Generate the digits with the needed markup,
	// and add them to the clock
	var locCifre = ceas.find('.cifre');

	$.each(pozitii, function(index, pozitie){
		if(pozitie == ':'){
			locCifre.append('<div class="dots">');
		}
		else{
			var locIndicator = $('<div>');
			for(var i=1; i<8; i++){
				locIndicator.append('<span class="d' + i + '">');	
		}
			// Set the digits as key:value pairs in the digits object
			cifre[pozitie] = locIndicator;

			// Add the digit elements to the page
			locCifre.append(locIndicator);
		}

	});

	// Add the weekday names
	var numeZile = 'Luni Marti Miercuri Joi Vineri Sambata Duminica'.split(' '),
		locZile = ceas.find('.weekdays');

	$.each(numeZile, function(index, zile){
		locZile.append('<span>' + zile + '</span>');
	});

	var zile = ceas.find('.weekdays span');


	// Run a timer every second and update the clock

	(function update_time(){

		// Use moment.js to output the current time as a string
		// hh is for the hours in 12-hour format,
		// mm - minutes, ss-seconds (all with leading zeroes),
		// d is for day of week and A is for AM/PM

		var acum = moment().format("hhmmssdA");

		cifre.h1.attr('class', numeleCifrelor[acum[0]]);
		cifre.h2.attr('class', numeleCifrelor[acum[1]]);
		cifre.m1.attr('class', numeleCifrelor[acum[2]]);
		cifre.m2.attr('class', numeleCifrelor[acum[3]]);
		cifre.s1.attr('class', numeleCifrelor[acum[4]]);
		cifre.s2.attr('class', numeleCifrelor[acum[5]]);

		// The library returns Sunday as the first day of the week.
		// Stupid, I know. Lets shift all the days one position down, 
		// and make Sunday last

		var pozitiaDuminica = acum[6];
		pozitiaDuminica--;
		
		// Sunday!
		if(pozitiaDuminica < 0){
			// Make it last
			pozitiaDuminica = 6;
		}

		// Mark the active day of the week
		zile.removeClass('active').eq(pozitiaDuminica).addClass('active');

		// Set the am/pm text:
		zinoapte.text(acum[7]+acum[8]);


		// Is there an alarm set?

		if(secundeDeScurs > 0){
			// Decrement the counter with one second
			secundeDeScurs--;

			// Activate the alarm icon
			alarma.addClass('active');
		}
		else if(secundeDeScurs == 0){

			timpulAExpirat.fadeIn();

			// Play the alarm sound. This will fail
			// in browsers which don't support HTML5 audio
			try{
				$('#alarm-ring')[0].play();
			}
			catch(e){}
			
			secundeDeScurs--;
			alarma.removeClass('active');
		}
		else{
			// The alarm has been cleared
			alarma.removeClass('active');
		}

		// Schedule this function to be run again in 1 sec
		setTimeout(update_time, 1000);

	})();



	// Handle setting and clearing alamrs

	$('.alarm-button').click(function(){
		
		// Show the dialog
		msgSetareAlarma.trigger('show');

	});

	msgSetareAlarma.find('.close').click(function(){
		msgSetareAlarma.trigger('hide')
	});

	msgSetareAlarma.click(function(element){

		// When the overlay is clicked, 
		// hide the dialog.
		if($(element.target).is('panou-alarma')){
			// This check is need to prevent
			// bubbled up events from hiding the dialog
			msgSetareAlarma.trigger('hide');
		}
	});


	setareAlarma.click(function(){

		var eNumarValid = true;
		var secundeSetate = 0;
		var maxSecunde = [3600, 60, 1];

		msgSetareAlarma.find('input').each(function(indexCamp,nrIntrodus){

			// Using the validity property in HTML5-enabled browsers:

			if(nrIntrodus.validity && !nrIntrodus.validity.valid){
				// The input field contains something other than a digit,
				// or a number less than the min value

				eNumarValid = false;
				nrIntrodus.focus();

				return false;
			}

			secundeSetate += maxSecunde[indexCamp] * parseInt(parseInt(nrIntrodus.value));
		});

		if(!eNumarValid){
			alert('Introduce-ti va rog un numer valid!');
			return;
		}

		if(secundeSetate < 1){
			alert('Alegeti va rog un moment in viitor!');
			return;	
		}

		secundeDeScurs = secundeSetate;
		msgSetareAlarma.trigger('hide');
	});

	stragereAlarma.click(function(){
		secundeDeScurs = -1;
		msgSetareAlarma.trigger('hide');
	});

	// Custom events to keep the code clean
	msgSetareAlarma.on('hide',function(){

		msgSetareAlarma.fadeOut();

	}).on('show',function(){

		// Calculate how much time is left for the alarm to go off.

		var ore = 0;
		var minute = 0;
		var secunde = 0;
		var tmp = 0;

		if(secundeDeScurs > 0){
			
			// There is an alarm set, calculate the remaining time

			tmp = secundeDeScurs;

			ore = Math.floor(tmp/3600);
			tmp = tmp%3600;

			minute = Math.floor(tmp/60);
			tmp = tmp%60;

			secunde = tmp;
		}

		// Update the input fields
		msgSetareAlarma.find('input').eq(0).val(ore).end().eq(1).val(minute).end().eq(2).val(secunde);

		msgSetareAlarma.fadeIn();

	});

	timpulAExpirat.click(function(){
		timpulAExpirat.fadeOut();
	});

});