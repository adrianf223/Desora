import {Alarma} from '../clase/alarma.js';
import {Multimedia} from '../clase/multimedia.js';
import {EroareData} from './eroaredata.js';

export class Registru {

    constructor() {
        this.listaAlarme = [];
        this.listaMultimedia = []; 
        this.listaErori = [];       
    }    
    
    gasesteAlarmaDupaId(id) {
        return this.listaAlarme.find(function(alarma) {
            return alarma.id === id;
        });
    }
    
    gasesteAlarmeSortateDupaId() {
        return this.listaAlarme.sort(function(alarma1, alarma2) {
            if (alarma1.id < alarma2.id)
                return -1;
            if (alarma1.id > alarma2.id)
                return 1;
            return 0;
        });
    }
    
    filtreazaAlarmaDupaNume(filtru) {
        return this.listaAlarme.filter(a => a.nume.indexOf(filtru) >= 0);
    }
    
    incarcaData(dateAlarme) {
        for (let data of dateAlarme) {
            switch(data.tip) {
                case 'alarma':
                    if (this.valideazaAlarma(data)) {
                        let alarma = this.incarcaAlarma(data);
                        if (alarma) 
                            this.listaAlarme.push(alarma);
                    }
                    else {
                        let e = new DataError('date alarma invalida', data);
                        this.listaErori.push(e);
                    }
                    break;
                case 'multimedia':
                    this.listaMultimedia.push(data);
                    break;
                default:
                    let e = new EroareData('tip invalid de date', data);
                    this.listaErori.push(e);
                    break;
            }
        }
    }
    
    incarcaAlarma(alarma) {
        try {
            let a = new Alarma(alarma.id, alarma.nume);
            a.moment = alarma.moment;
            return a;
        } catch(e) {
            this.listaErori.push(new EroareData('eroare incarcare alarma', alarma));
        }
        return null;
    }
    
    valideazaAlarma(alarma) {
        let proprietati = 'id nume moment'.split(' ');
        let areEroare = false;
        
        for (let camp of proprietati) {
            if (!alarma[camp]) {
                this.listaErori.push(new EroareData(`camp invalid ${camp}`, alarma));
                areEroare = true;
            }
        }
        if (Number.isNaN(Number.parseFloat(alarma.moment))) {
            this.listaErori.push(new EroareData('moment invalid', alarma));
            areEroare = true;
        }
        return !areEroare;
    }
}
