import {Element} from './element.js';

export class Titlu extends Element {
    
    constructor(nume) {
        super();
        this.nume = nume;
        this.listaLinkuri = [];
    }
    
    link(nume, href) {
        this.listaLinkuri.push({nume,href});
    }   
    
    html() {
        let linkuri = '';
        for (let ancora of this.listaLinkuri)
            linkuri += `<a class="mdl-navigation__link" href="${ancora.href}">${ancora.nume}</a>\n`;
        return `
            <div class="mdl-layout mdl-js-layout mdl-layout--fixed-header">
                <header class="mdl-layout__header">
                    <div class="mdl-layout__header-row">
                    <span class="mdl-layout-title">${this.nume}</span>
                    <div class="mdl-layout-spacer"></div>
                    <nav class="mdl-navigation mdl-layout--large-screen-only">
                        ${linkuri}
                    </nav>
                    </div>
                </header>
                <div class="mdl-layout__drawer">
                    <span class="mdl-layout-title">${this.nume}</span>
                    <nav class="mdl-navigation">
                        ${linkuri}
                    </nav>
                </div>
                <main class="mdl-layout__content">
                    <div class="page-content"><!-- Continut --></div>
                </main>
                </div>`;
    }
}
