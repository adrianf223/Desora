import {Sunatoare} from './sunatoare.js';

export class Alarma extends Sunatoare {
    constructor(id, nume) {
        super(id, nume);
        this.moment = null;
    }
}