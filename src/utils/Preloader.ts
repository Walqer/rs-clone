import { Control } from './Control';

class Preloader {
    preload: Control<HTMLElement>;

    constructor() {
        this.preload = new Control<HTMLElement>('div', 'loading');
    }

    start() {
        const { body } = document;
        // this.preload.element.innerHTML = `<div class="lds-dual-ring"></div>`;
        this.preload.element.innerHTML = `<div class="loading-container">
                                            <span></span>
                                            <span></span>
                                            <span></span>
                                            <span></span>
                                          </div>`;
        body.append(this.preload.element);
    }

    stop() {
        this.preload.remove();
    }
}

export default new Preloader();
