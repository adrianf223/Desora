import 'jquery';
import {Titlu} from './titlu.js';

export class Ruta {
    
    constructor(nume) {
        this.nume = nume;
        this.titlu = new Titlu(this.nume);
        this.rutaImplicita = null;
        this.listaRute = {};
    }
    
    adauga(id, pagina, implicit = false) {
        this.titlu.link(id, "");

        this.listaRute[id] = pagina;
        
        if (implicit) {
            this.rutaImplicita = id;
        }
    }
    
    activeaza(ruta) {
        let continut = this.titlu.tag.find('.page-content');
        continut.empty();
        
        this.listaRute[ruta].adauga(continut);
        
    }
    
}
