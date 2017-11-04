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

        // Mapare cifre la numele lor 
        this.numeleCifrelor = 'zero unu doi trei patru cinci sase sapte opt noua'.split(' ');

        // Obiect pentru memorare segmente cifre
        this.segmente = {};

        // Pozitii pentru ore, minute si secunde
        this.pozitii = ['h1', 'h2', ':', 'm1', 'm2', ':', 's1', 's2'];
    }


    adaugaSegmente() {
        // Generare segmente cifre si adaugare la ceas
        let locCifre = this.ceas.find('.cifre');

        for (let index in this.pozitii) {
            if (this.pozitii[index] == ':') {
                locCifre.append('<div class="douapuncte">');
            } else {
                let locIndicator = $('<div>');
                for (let numar = 1; numar < 8; numar++) {
                    locIndicator.append('<span class="segment' + numar + '">');
                }
                // Seteaza segmentele cifrelor in obiectul lor
                this.segmente[this.pozitii[index]] = locIndicator;

                // Adaugare segmente la pagina
                locCifre.append(locIndicator);
            }
        }
    }

    adaugaZileleSaptamanii() {
        // Adaugare zilele saptamanii
        let numeZile = 'Luni Marti Miercuri Joi Vineri Sambata Duminica'.split(' ');
        let locZile = this.ceas.find('.zile');
        $.each(numeZile, function (index, nume) {
            locZile.append('<span>' + nume + '</span>');
        });
    }

    actualizareEcran() {

        let acum = moment().format("hhmmssdA");
        this.segmente.h1.attr('class', this.numeleCifrelor[acum[0]]);
        this.segmente.h2.attr('class', this.numeleCifrelor[acum[1]]);
        this.segmente.m1.attr('class', this.numeleCifrelor[acum[2]]);
        this.segmente.m2.attr('class', this.numeleCifrelor[acum[3]]);
        this.segmente.s1.attr('class', this.numeleCifrelor[acum[4]]);
        this.segmente.s2.attr('class', this.numeleCifrelor[acum[5]]);

        // Workaround pozitie mutand duminica o pozitie in jos ca sa fie ultima
        let workaroundPozitie = acum[6];
        workaroundPozitie--;
        if (workaroundPozitie < 0) {
            workaroundPozitie = 6;
        }

        // Marcheaza ziua activa a saptamanii
        this.zile = this.ceas.find('.zile span');        
        this.zile.removeClass('active').eq(workaroundPozitie).addClass('active');

        // setam indicatorul am/pm
        this.zinoapte.text(acum[7] + acum[8]);
    }

}