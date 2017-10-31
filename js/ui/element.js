import 'jquery';

export class Element {
    
    constructor() {
        this.tag = null;  // object jQuery 
    }
    
    adauga(element) {
        this.creeaza();
        element.append(this.tag);
        this.refresh();
    }
    
    creeaza() {
        let text = this.html();
        this.tag = $(text);
    }
    
    html() {
        throw 'metoda aceasta trebuie supraincarcata in clasa derivata';
    }
    
    refresh() {
        componentHandler.upgradeElement(this.tag[0]);
    }
}