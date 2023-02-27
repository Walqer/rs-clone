import { QueryStringParams } from './types';

export abstract class AbstractView {
    title: string;

    params: QueryStringParams = {};
    abstract mounted(): void;

    constructor(params: QueryStringParams) {
        if (params) {
            this.params = params;
        }
        this.title = 'MiniTrello - ';
    }

    setTitle(title: string) {
        document.title = this.title + title;
    }

    async getHtml() {
        return '';
    }
}
