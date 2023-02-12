import { Column } from '../../spa/types';
import { state } from '../../store/state';
import { Control } from '../../utils/Control';
import boardController from '../controller/board.controller';

class BoardView {
    async render() {
        const board = new Control<HTMLElement>('div', 'board');
        const header = new Control<HTMLElement>('div', 'board__header');
        const title = new Control<HTMLElement>('h2', 'board__header-title');
        const search = new Control<HTMLElement>('div', 'board__header-search');
        const columns = new Control<HTMLElement>('div', 'board__columns');
        const createColumn = new Control<HTMLElement>('div', 'column', 'column-create');
        const createColumnInput = new Control<HTMLInputElement>('input', 'column-create__input');
        const createColumnButtons = new Control<HTMLElement>('div', 'column-create__buttons', 'column-create__buttons_hide');
        const createColumnAddBtn = new Control<HTMLElement>('a', 'column-create__add-btn', 'column-create__add-btn');
        const createColumnCancelBtn = new Control<HTMLElement>('a', 'column-create__cancel-btn', 'column-create__cancel-btn');

        header.append(board.element);
        title.append(header.element);
        search.append(header.element);
        columns.append(board.element);
        createColumn.append(columns.element);
        createColumnInput.append(createColumn.element);
        createColumnButtons.append(createColumn.element);
        createColumnAddBtn.append(createColumnButtons.element);
        createColumnCancelBtn.append(createColumnButtons.element);
        await boardController.getColumns();
        if (state.columns) {
            state.columns.forEach((elem) => {
                columns.element.append(this.renderColumn(elem));
            });
        }
        createColumn.append(columns.element);
        createColumnInput.element.value = 'Add another column';
        createColumnAddBtn.element.innerHTML = 'Add column';
        title.element.textContent = 'Board';

        createColumnInput.element.addEventListener('focus', () => {
            createColumnButtons.element.classList.add('column-create__buttons_visible');
            createColumnInput.element.placeholder = 'Enter column title...';
            createColumnInput.element.value = '';
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            createColumnAddBtn.element.addEventListener('click', async () => {
                if (createColumnInput.element.value) {
                    await boardController.createColumn(createColumnInput.element.value);
                    await this.update();
                } else createColumnInput.element.focus();
            });
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            createColumnCancelBtn.element.addEventListener('click', async () => {
                createColumnButtons.element.classList.remove('column-create__buttons_visible');
                createColumnInput.element.value = 'Add another column';
            });
        });

        return board.element;
    }

    renderColumn(column: Column) {
        const columnBox = new Control<HTMLElement>('div', 'column');
        const columnTitle = new Control<HTMLElement>('div', 'column__title');
        const columnName = new Control<HTMLInputElement>('input', 'column__title_name');
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

        columnName.element.value = column.title;
        columnRemoveImg.element.src = '../assets/icons/remove-task.png';
        addTask.element.innerHTML = 'Add task..';

        columnName.element.addEventListener('focus', () => {
            columnName.element.select();
            columnName.element.setSelectionRange(0, 99999);
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            document.addEventListener('keyup', async (event) => {
                if (event.code === 'Enter') columnName.element.blur();
            });
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            columnName.element.addEventListener('focusout', async () => {
                await boardController.updateColumnById(column._id, columnName.element.value);
            });
        });

        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        columnRemove.element.addEventListener('click', async () => {
            await boardController.deleteColumnById(column._id);
            await this.update();
        });
        return columnBox.element;
    }

    async update() {
        const newData = this.render();
        const oldData = document.querySelector('.board') as HTMLElement;
        oldData.replaceWith(await newData);
    }
}

export default new BoardView();
