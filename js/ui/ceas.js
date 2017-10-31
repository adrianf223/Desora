import 'jquery';
import {Element} from './element.js';
import moment from 'moment-es6';
export class Ceas extends Element 
{
    
	constructor() 
	{
		super();
		this.ceas = '';
		this.pozitieCifre = '';
		this.format12_24 = '';
		this.numeCifre = 'zero unu doi trei patru cinci sase sapte opt noua'.split(' ');
		this.cifre = {};
		this.pozitii = ['o1', 'o2', ':', 'm1', 'm2', ':', 's1', 's2'];
		this.zile = {};
		this.acum;
		this.duminica;

		console.log(moment(123456).fromNow());
		
    }
    
	html() 
	{
        return `
        <div id="ceas" class="light">
		<div class="afisaj">
			<div class="zile"></div>
			<div class="format12_24"></div>
			<div class="alarma"></div>
			<div class="cifre"></div>
		</div>
	</div>
		`;
	}
	
	creazaOrele()
	{
		this.ceas = $('#ceas');		
		let pozitieCifre = this.ceas.find('.cifre');
		this.pozitii = ['o1', 'o2', ':', 'm1', 'm2', ':', 's1', 's2']
		let cifre = {};
		
		$.each(this.pozitii , function(e){
			if(e == ':')
			{				
				// adauga la obiect doua puncte
				pozitieCifre.append('<div class="puncte">');
			}
			else if(e)
			{			
				let p = $('<div>');
				for(var i=1; i<8; i++)
				{
					p.append('<span class="p' + i + '">');
				}
								
				console.log(cifre);

				// Adauga la obiectul cifre 
				cifre[e] = p;

				// adauga la pagina
				pozitieCifre.append(p);
			}
		})
	}

	creazaZilele()
	{
		
		let numeZile = 'LU MA MI JO VI SA DU'.split(' ');
		let pozitieZi = this.ceas.find('.zile');

		$.each(numeZile, function(e)
		{
			pozitieZi.append('<span>' + e + '</span>');
		});

		this.zile = this.ceas.find('.zile span');
	}

	updateCeas()
	{
		this.acum = moment().format("hhmmssdA");
		this.cifre.o1.attr('class', this.numeCifre[acum[0]]);
		this.cifre.o2.attr('class', this.numeCifre[acum[1]]);
		this.cifre.m1.attr('class', this.numeCifre[acum[2]]);
		this.cifre.m2.attr('class', this.numeCifre[acum[3]]);
		this.cifre.s1.attr('class', this.numeCifre[acum[4]]);
		this.cifre.s2.attr('class', this.numeCifre[acum[5]]);
		
		// Mutam toate zilele o pozitie in jos ca duminica sa fie ultima
		this.duminica = acum[6];
		this.duminica--;
				
		if(this.duminica < 0)
		{
			this.duminica = 6;
		}
	}

	markeazaZiuaActiva()
	{
		this.zile = this.ceas.find('.weekdays span');
		this.zile.removeClass('activ').eq(this.duminica).addClass('activ');		
	}

	seteazaFormatOra()
	{
		this.acum = moment().format("hhmmssdA");		
		this.format12_24 = this.ceas.find('.format12_24');		
		this.format12_24.text(this.acum[7]+this.acum[8]);		
	}

	start()
	{
		setTimeout(updateCeas, 1000);		
	}

	

}