import { state } from '../../store/state';
import { Control } from '../../utils/Control';
import columnController from '../controller/column.controller';

class ColumnView {
    render(title: string, boardId: string, columnId: string): HTMLElement {
        const column = new Control<HTMLElement>('div', 'column');
        const columnTitle = new Control<HTMLElement>('a', 'column__title');
        const columnRemove = new Control<HTMLElement>('div', 'column__remove-column');
        const tasks = new Control<HTMLElement>('div', 'column__tasks');
        const addTask = new Control<HTMLElement>('a', 'column__add-task');

        columnTitle.append(column.element);
        tasks.append(column.element);
        columnRemove.append(column.element);
        addTask.append(column.element);
        columnTitle.element.textContent = title;
        columnRemove.element.textContent = 'Remove column';
        addTask.element.innerHTML = 'Add task..';

        columnRemove.element.addEventListener('click', () => {
            columnController.removeColumn(state.token as string, boardId, columnId);
        });
        return column.element;
    }
}

export default new ColumnView();
