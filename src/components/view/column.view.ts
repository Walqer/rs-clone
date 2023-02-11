import { Column } from '../../spa/types';
import { Control } from '../../utils/Control';
import columnController from '../controller/column.controller';

class ColumnView {
    render(column: Column): HTMLElement {
        const columnBox = new Control<HTMLElement>('div', 'column');
        const columnTitle = new Control<HTMLElement>('div', 'column__title');
        const columnName = new Control<HTMLElement>('a', 'column__title_name');
        const columnRemove = new Control<HTMLElement>('div', 'column__title_remove-column');
        const tasks = new Control<HTMLElement>('div', 'column__tasks');
        const addTask = new Control<HTMLElement>('a', 'column__add-task');

        columnTitle.append(columnBox.element);
        columnName.append(columnTitle.element);
        columnRemove.append(columnTitle.element);
        tasks.append(columnBox.element);
        addTask.append(columnBox.element);

        columnName.element.textContent = column.title;
        columnRemove.element.textContent = 'DEL';
        addTask.element.innerHTML = 'Add task..';

        columnRemove.element.addEventListener('click', () => {
            // eslint-disable-next-line @typescript-eslint/no-floating-promises
            columnController.deleteColumnById(column._id);
        });
        return columnBox.element;
    }
}

export default new ColumnView();
