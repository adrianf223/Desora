import {Element} from './element.js';

export class Tabel extends Element {
    
    constructor(antet, date) {
        super();
        this.antete = antet;
        this.date = date;
    }
    
    html() {
        
        let th_uri = '';
        for (let antet of this.antete) {
            th_uri += `<th class="mdl-data-table__cell--non-numeric">${antet}</th>\n`;
        }
        
        let tr_uri = '';
        for (let linie of this.date) {
            tr_uri += `<tr>`;
            let td_uri = '';
            for (let element of this.antete) {
                let camp = linie[element.toLowerCase()];
                tr_uri += `<td class="mdl-data-table__cell--non-numeric">
                             ${camp}
                           </td>
                          `;
            }
            tr_uri += '</tr>';
        }
        
        return `
            <table class="mdl-data-table mdl-js-data-table mdl-shadow--2dp">
                <thead>
                    <tr>
                    ${th_uri}
                    </tr>
                </thead>
                <tbody>
                    ${tr_uri}
                </tbody>
            </table>

        `;
    }
    
}
