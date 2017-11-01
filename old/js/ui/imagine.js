import {Element} from './element.js';

export class Imagine extends Element {
    
    constructor(fisier) {
        super();
        this.fisier = fisier;
    }
    
    html() {
        return `<img src="${this.fisier}" style="width: 40%;" />`;
    }
}