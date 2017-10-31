import 'jquery';
import {Alarma} from './clase/alarma.js';
import {Multimedia} from './clase/multimedia.js';
import {Registru} from './repo/registru.js';

import {Buton} from './ui/buton.js';
import {Imagine} from './ui/imagine.js';
import {Titlu} from './ui/titlu.js';
import {Tabel} from './ui/tabel.js';

import {dateTest} from './date-test.js';

import {Ruta} from './ui/ruta.js';
import {Acasa} from './acasa.js';
import {PaginaAlarme} from './pagina-alarme.js';
import {PaginaMultimedia} from './pagina-multimedia.js';

export class App extends Ruta {
    
    constructor() {
        super('Desora');
        
        this.registru = new Registru();
        this.registru.incarcaData(dateTest);
    }

    init() {
        this.adauga('Ceas', new Acasa('Ceas'), true);
        this.adauga('Alarme', new PaginaAlarme('Alarme'));
        this.adauga('Multimedia', new PaginaMultimedia('Multimedia'));
    }

    start(element) {
        this.init();
        this.titlu.adauga(element);
        
        this.titlu.tag.find('.mdl-navigation__link').on('click',(element) => {
            let ruta = element.target.innerHTML;
            this.activeaza(ruta);
        });
        
        if (this.rutaImplicita) {
            this.activeaza(this.rutaImplicita);
        }
    }

}
     

export let app = new App();
app.start($('body'));
