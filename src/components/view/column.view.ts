import { Column } from '../../spa/types';
import { Control } from '../../utils/Control';
// eslint-disable-next-line import/no-cycle
import columnController from '../controller/column.controller';

class ColumnView {
    render(column: Column): HTMLElement {
        const columnBox = new Control<HTMLElement>('div', 'column');
        const columnTitle = new Control<HTMLElement>('div', 'column__title');
        const columnName = new Control<HTMLElement>('a', 'column__title_name');
        const columnRemove = new Control<HTMLElement>('div', 'column__title_remove');
        const columnRemoveImg = new Control<HTMLImageElement>('img', 'column__title_remove-img');
        const tasks = new Control<HTMLElement>('div', 'column__tasks');
        const addTask = new Control<HTMLElement>('a', 'column__add-task');

        columnTitle.append(columnBox.element);
        columnName.append(columnTitle.element);
        columnRemove.append(columnTitle.element);
        columnRemoveImg.append(columnRemove.element);
        tasks.append(columnBox.element);
        addTask.append(columnBox.element);

        columnName.element.textContent = column.title;
        columnRemoveImg.element.src = '../assets/icons/remove-task.png';
        addTask.element.innerHTML = 'Add task..';

        columnRemove.element.addEventListener('click', () => {
            // eslint-disable-next-line @typescript-eslint/no-floating-promises
            columnController.deleteColumnById(column._id);
        });
        return columnBox.element;
    }
}

export default new ColumnView();
