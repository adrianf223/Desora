import {Element} from './element.js';

export class Buton extends Element {
    
    constructor(nume) {
        super();
        this.nume = nume;
        this.definitieStil = '';        
    }
    
    html() {
        return `
            <button class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent">
                ${this.nume}
            </button>
        `;
    }

    stil(stil) {
        this.definitieStil = stil;
    }
}