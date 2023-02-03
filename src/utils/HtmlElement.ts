export class HtmlElem {
    public element: HTMLElement;

    constructor(element: string, ...classNames: string[]) {
        this.element = document.createElement(element);
        this.element.classList.add(...classNames);
    }

    append(parent: HTMLElement) {
        parent.appendChild(this.element);
    }

    remove() {
        this.element.remove();
    }
}
