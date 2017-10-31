import {Sunatoare} from './sunatoare.js';

export class Multimedia extends Sunatoare {
    constructor(id, nume) {
        super(id, nume);
        this.url = null;
    }
}