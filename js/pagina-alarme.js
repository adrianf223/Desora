import {Pagina} from './ui/pagina.js';
import {Tabel} from './ui/tabel.js';
import {app} from './app.js';

export class PaginaAlarme extends Pagina {
    
    constructor(nume) {
        super(nume);        
    }
    
    creeaza() {
        super.creeaza();

        let antete = 'Id Nume Moment'.split(' ');
        let tabel = new Tabel(antete, app.registru.listaAlarme);
        tabel.adauga(this.tag);
    }
    
    html() {
        return '<div style="margin: 20px;"><h3>Alarme</h3></div>';
    }
}
