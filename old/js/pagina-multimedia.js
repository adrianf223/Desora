import {Pagina} from './ui/pagina.js';
import {Tabel} from './ui/tabel.js';
import {app} from './app.js';

export class PaginaMultimedia extends Pagina {
    
    constructor(nume) {
        super(nume);
    }
    
    creeaza() {
        super.creeaza();
        
        let antete = 'Id Nume Url'.split(' ');
        let tabel = new Tabel(antete, app.registru.listaMultimedia);
        tabel.adauga(this.tag);

    }
    
    html() {
        return '<div style="margin: 20px;"><h3>Multimedia</h3></div>';
    }
}