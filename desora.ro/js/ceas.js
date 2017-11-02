import $ from "jquery";
import moment from 'moment-es6';

export class Ceas {
    constructor() {
        this.ceas = $('#ceas');
        this.alarma = this.ceas.find('.alarma');
        this.zinoapte = this.ceas.find('.zinoapte');
        // this.locCifre = this.ceas.find('.cifre');
        // this.locZile = this.ceas.find('.zile');
        this.zile = this.ceas.find('.zile span');

        // Map digits to their names (this will be an array)
        this.numeleCifrelor = 'zero unu doi trei patru cinci sase sapte opt noua'.split(' ');

        // This object will hold the digit elements
        this.segmente = {};

        // Positions for the hours, minutes, and seconds
        this.pozitii = ['h1', 'h2', ':', 'm1', 'm2', ':', 's1', 's2'];
    }


    adaugaSegmente() {
        // Generate the digits with the needed markup,
        // and add them to the clock
        let locCifre = this.ceas.find('.cifre');

        for (var index in this.pozitii) {
            if (this.pozitii[index] == ':') {
                locCifre.append('<div class="douapuncte">');
            } else {
                let locIndicator = $('<div>');
                for (let numar = 1; numar < 8; numar++) {
                    locIndicator.append('<span class="segment' + numar + '">');
                }
                // Set the digits as key:value pairs in the digits object
                this.segmente[this.pozitii[index]] = locIndicator;
                // Add the digit elements to the page
                locCifre.append(locIndicator);
            }
        }
    }

    adaugaZileleSaptamanii() {
        // Add the weekday names
        let numeZile = 'Luni Marti Miercuri Joi Vineri Sambata Duminica'.split(' ');
        let locZile = this.ceas.find('.zile');
        $.each(numeZile, function (index, nume) {
            locZile.append('<span>' + nume + '</span>');
        });
    }

    actualizareEcran() {

        // Use moment.js to output the current time as a string
        // hh is for the hours in 12-hour format,
        // mm - minutes, ss-seconds (all with leading zeroes),
        // d is for day of week and A is for AM/PM
        var acum = moment().format("hhmmssdA");
        this.segmente.h1.attr('class', this.numeleCifrelor[acum[0]]);
        this.segmente.h2.attr('class', this.numeleCifrelor[acum[1]]);
        this.segmente.m1.attr('class', this.numeleCifrelor[acum[2]]);
        this.segmente.m2.attr('class', this.numeleCifrelor[acum[3]]);
        this.segmente.s1.attr('class', this.numeleCifrelor[acum[4]]);
        this.segmente.s2.attr('class', this.numeleCifrelor[acum[5]]);
        // The library returns Sunday as the first day of the week.
        // Stupid, I know. Lets shift all the days one position down, 
        // and make Sunday last
        var pozitiaDuminica = acum[6];
        pozitiaDuminica--;
        // Sunday!
        if (pozitiaDuminica < 0) {
            // Make it last
            pozitiaDuminica = 6;
        }
        // Mark the active day of the week
        this.zile.removeClass('active').eq(pozitiaDuminica).addClass('active');
        // Set the am/pm text:
        this.zinoapte.text(acum[7] + acum[8]);
    }

}