import { state } from '../../store/state';
import { Control } from '../../utils/Control';
import columnController from '../controller/column.controller';
// eslint-disable-next-line import/no-cycle
import boardView from './board.view';

class ColumnView {
    render(title: string, boardId: string, columnId: string): HTMLElement {
        const update = async () => {
            const newData = boardView.render(state.token as string, boardId);
            const oldData = document.querySelector('.board') as HTMLElement;
            oldData.replaceWith(await newData);
        };
        const column = new Control<HTMLElement>('div', 'column');
        const columnTitle = new Control<HTMLElement>('div', 'column__title');
        const columnName = new Control<HTMLElement>('a', 'column__title_name');
        const columnRemove = new Control<HTMLElement>('div', 'column__title_remove-column');
        const tasks = new Control<HTMLElement>('div', 'column__tasks');
        const addTask = new Control<HTMLElement>('a', 'column__add-task');

        columnTitle.append(column.element);
        columnName.append(columnTitle.element);
        columnRemove.append(columnTitle.element);
        tasks.append(column.element);
        addTask.append(column.element);

        columnName.element.textContent = title;
        columnRemove.element.textContent = 'DEL';
        addTask.element.innerHTML = 'Add task..';

        columnRemove.element.addEventListener('click', () => {
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            columnController.removeColumn(state.token as string, boardId, columnId, update);
        });
        return column.element;
    }
}

export default new ColumnView();
