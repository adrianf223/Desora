$(function(){

	// Cache some selectors

	var ceas = $('#ceas'),
		alarma = ceas.find('.alarma'),
		zinoapte = ceas.find('.zinoapte'),
		msgSetareAlarma = $('#msg-alarma').parent(),
		setareAlarma = $('#alarma-setare'),
		stragereAlarma = $('#alarma-stergere'),
		timpulAExpirat = $('#time-is-up').parent();

	// This will hold the number of seconds left
	// until the alarm should go off
	var nrAlarme = -1;

	// Map digits to their names (this will be an array)
	var numeleCifrelor = 'zero one two three four five six seven eight nine'.split(' ');

	// This object will hold the digit elements
	var cifre = {};

	// Positions for the hours, minutes, and seconds
	var pozitii = [
		'h1', 'h2', ':', 'm1', 'm2', ':', 's1', 's2'
	];

	// Generate the digits with the needed markup,
	// and add them to the clock

	var locCifre = ceas.find('.cifre');

	$.each(pozitii, function(){

		if(this == ':'){
			locCifre.append('<div class="dots">');
		}
		else{

			var pozitie = $('<div>');

			for(var i=1; i<8; i++){
				pozitie.append('<span class="d' + i + '">');
			}

			// Set the digits as key:value pairs in the digits object
			cifre[this] = pozitie;

			// Add the digit elements to the page
			locCifre.append(pozitie);
		}

	});

	// Add the weekday names
	var numeZile = 'Luni Marti Miercuri Joi Vineri Sambata Duminica'.split(' '),
		locZile = ceas.find('.weekdays');

	$.each(numeZile, function(){
		locZile.append('<span>' + this + '</span>');
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

		var dow = acum[6];
		dow--;
		
		// Sunday!
		if(dow < 0){
			// Make it last
			dow = 6;
		}

		// Mark the active day of the week
		zile.removeClass('active').eq(dow).addClass('active');

		// Set the am/pm text:
		zinoapte.text(acum[7]+acum[8]);


		// Is there an alarm set?

		if(nrAlarme > 0){
			
			// Decrement the counter with one second
			nrAlarme--;

			// Activate the alarm icon
			alarma.addClass('active');
		}
		else if(nrAlarme == 0){

			timpulAExpirat.fadeIn();

			// Play the alarm sound. This will fail
			// in browsers which don't support HTML5 audio

			try{
				$('#alarm-ring')[0].play();
			}
			catch(e){}
			
			nrAlarme--;
			alarma.removeClass('active');
		}
		else{
			// The alarm has been cleared
			alarma.removeClass('active');
		}

		// Schedule this function to be run again in 1 sec
		setTimeout(update_time, 1000);

	})();

	// // Switch the theme

	// $('#switch-theme').click(function(){
	// 	ceas.toggleClass('light dark');
	// });


	// Handle setting and clearing alamrs

	$('.alarm-button').click(function(){
		
		// Show the dialog
		msgSetareAlarma.trigger('show');

	});

	msgSetareAlarma.find('.close').click(function(){
		msgSetareAlarma.trigger('hide')
	});

	msgSetareAlarma.click(function(e){

		// When the overlay is clicked, 
		// hide the dialog.

		if($(e.target).is('.overlay')){
			// This check is need to prevent
			// bubbled up events from hiding the dialog
			msgSetareAlarma.trigger('hide');
		}
	});


	setareAlarma.click(function(){

		var valid = true, after = 0,
			to_seconds = [3600, 60, 1];

		msgSetareAlarma.find('input').each(function(i){

			// Using the validity property in HTML5-enabled browsers:

			if(this.validity && !this.validity.valid){

				// The input field contains something other than a digit,
				// or a number less than the min value

				valid = false;
				this.focus();

				return false;
			}

			after += to_seconds[i] * parseInt(parseInt(this.value));
		});

		if(!valid){
			alert('Introduce-ti va rog un numer valid!');
			return;
		}

		if(after < 1){
			alert('Alegeti va rog un moment in viitor!');
			return;	
		}

		nrAlarme = after;
		msgSetareAlarma.trigger('hide');
	});

	stragereAlarma.click(function(){
		nrAlarme = -1;

		msgSetareAlarma.trigger('hide');
	});

	// Custom events to keep the code clean
	msgSetareAlarma.on('hide',function(){

		msgSetareAlarma.fadeOut();

	}).on('show',function(){

		// Calculate how much time is left for the alarm to go off.

		var hours = 0, minutes = 0, seconds = 0, tmp = 0;

		if(nrAlarme > 0){
			
			// There is an alarm set, calculate the remaining time

			tmp = nrAlarme;

			hours = Math.floor(tmp/3600);
			tmp = tmp%3600;

			minutes = Math.floor(tmp/60);
			tmp = tmp%60;

			seconds = tmp;
		}

		// Update the input fields
		msgSetareAlarma.find('input').eq(0).val(hours).end().eq(1).val(minutes).end().eq(2).val(seconds);

		msgSetareAlarma.fadeIn();

	});

	timpulAExpirat.click(function(){
		timpulAExpirat.fadeOut();
	});

});