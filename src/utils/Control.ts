export class Control<T extends HTMLElement> {
    public element: T;

    constructor(element: string, ...classNames: string[]) {
        this.element = <T>document.createElement(element);
        this.element.classList.add(...classNames);
    }

    append(parent: HTMLElement) {
        parent.appendChild(this.element);
    }

    remove() {
        this.element.remove();
    }
}
