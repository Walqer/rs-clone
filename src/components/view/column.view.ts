import { Control } from '../../utils/Control';

class ColumnView {
    render(title: string): HTMLElement {
        const column = new Control<HTMLElement>('div', 'column');
        const columnTitle = new Control<HTMLElement>('h3', 'column__title');
        const tasks = new Control<HTMLElement>('div', 'column__tasks');

        columnTitle.append(column.element);
        tasks.append(column.element);

        columnTitle.element.textContent = title;

        return column.element;
    }
}

export default new ColumnView();
