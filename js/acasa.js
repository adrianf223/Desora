import {Pagina} from './ui/pagina.js';
import {Imagine} from './ui/imagine.js';
import {Buton} from './ui/buton.js';
import {app} from './app.js';

export class Acasa extends Pagina {
    
    constructor() {
        super('Ceas');
    }
    
    creeaza() {
        super.creeaza();

        let imagine = new Imagine('./clock.png');
        imagine.adauga(this.tag);
       
        let stilButon = 'width: 20px; height: 50px; font-size: 16px; margin: 0px;';
        
        let alarme = new Buton('Alarme');
        alarme.stil(stilButon);
        alarme.adauga(this.tag);
        alarme.tag.click(() => app.activeaza('Alarme'));
        
        let multimedia = new Buton('Multimedia');
        multimedia.stil(stilButon);
        multimedia.adauga(this.tag);
        multimedia.tag.click(() => app.activeaza('Multimedia'));
    }
    
    html() {
        return '<div style="text-align: center;">Ceas</div>';
    }
}
