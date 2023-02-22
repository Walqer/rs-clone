import { Board, Column, Task } from '../../spa/types';
import { state } from '../../store/state';
import { Control } from '../../utils/Control';
import boardController from '../controller/board.controller';
import preloader from '../../utils/Preloader';
import manageUsersView from './manage-users.view';

class BoardView {
    async render() {
        const board = new Control<HTMLElement>('div', 'board');
        const header = new Control<HTMLElement>('div', 'board__header');
        const title = new Control<HTMLElement>('h2', 'board__header-title');
        const search = new Control<HTMLElement>('div', 'board__header-search');
        const users = new Control<HTMLElement>('div', 'board__header-users');
        const usersButton = new Control<HTMLButtonElement>('button', 'white-button');
        const columns = new Control<HTMLElement>('div', 'board__columns');
        const createColumn = new Control<HTMLElement>('div', 'column-create');
        const createColumnInput = new Control<HTMLInputElement>('input', 'column-create__input');
        const createColumnButtons = new Control<HTMLElement>('div', 'column-create__buttons', 'column-create__buttons_hide');
        const createColumnAddBtn = new Control<HTMLElement>('a', 'column-create__add-btn', 'column-create__add-btn');
        const createColumnCancelBtn = new Control<HTMLElement>('a', 'column-create__cancel-btn', 'column-create__cancel-btn');
        const usersModal = new Control<HTMLDivElement>('div', 'users-modal');

        usersModal.append(board.element);
        header.append(board.element);
        title.append(header.element);
        search.append(header.element);
        users.append(header.element);
        usersButton.append(users.element);
        usersButton.element.innerHTML = 'Users';
        columns.append(board.element);
        createColumn.append(columns.element);
        createColumnInput.append(createColumn.element);
        createColumnButtons.append(createColumn.element);
        createColumnAddBtn.append(createColumnButtons.element);
        createColumnCancelBtn.append(createColumnButtons.element);

        preloader.start();
        await boardController.getColumns();
        // eslint-disable-next-line no-restricted-syntax
        for (const column of state.columns) {
            // eslint-disable-next-line no-await-in-loop
            columns.element.append(await this.renderColumn(column));
        }
        preloader.stop();

        createColumn.append(columns.element);
        createColumnInput.element.value = 'Add another column';
        createColumnAddBtn.element.innerHTML = 'Add column';
        title.element.textContent = `Board: ${(await boardController.getBoard() as Board).title}`;

        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        usersButton.element.addEventListener('click', async () => {
            if (usersModal.element.innerHTML === '') {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-call
                await boardController.getBoardUsers();
                usersModal.element.append(manageUsersView.render());
            }
            usersModal.element.style.display = 'block';
        });

        usersModal.element.addEventListener('click', (e) => {
            const { target } = e;
            if ((target as HTMLElement).classList.contains('users-modal')) {
                usersModal.element.style.display = 'none';
            }
        });

        createColumnInput.element.addEventListener('focus', () => {
            createColumnButtons.element.classList.add('column-create__buttons_visible');
            createColumnInput.element.placeholder = 'Enter column title...';
            createColumnInput.element.value = '';
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            createColumnAddBtn.element.addEventListener('click', async () => {
                if (createColumnInput.element.value) {
                    preloader.start();
                    await boardController.createColumn(createColumnInput.element.value);
                    await this.update();
                    preloader.stop();
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

    async renderColumn(column: Column) {
        const columnWrap = new Control<HTMLElement>('div', 'column__wrapper');
        const columnBox = new Control<HTMLElement>('div', 'column');
        const columnTitle = new Control<HTMLElement>('div', 'column__title');
        const columnName = new Control<HTMLInputElement>('input', 'column__title_name');
        const columnRemove = new Control<HTMLElement>('div', 'column__title_remove');
        const columnRemoveImg = new Control<HTMLImageElement>('img', 'column__title_remove-img');
        const tasks = new Control<HTMLUListElement>('ul', 'column__tasks');

        const createTask = new Control<HTMLElement>('div', 'column-create', 'task-create');
        const createTaskInput = new Control<HTMLInputElement>('input', 'column-create__input');
        const createTaskButtons = new Control<HTMLElement>('div', 'column-create__buttons', 'column-create__buttons_hide');
        const createTaskAddBtn = new Control<HTMLElement>('a', 'column-create__add-btn', 'column-create__add-btn');
        const createTaskCancelBtn = new Control<HTMLElement>('a', 'column-create__cancel-btn', 'column-create__cancel-btn');

        const tasksInColumn = (await boardController.getTasks(column._id)) as Task[];
        // eslint-disable-next-line no-restricted-syntax
        for (const task of tasksInColumn) {
            const taskItem = new Control<HTMLElement>('li', 'column__task');
            taskItem.element.textContent = task.title;
            taskItem.append(tasks.element);
        }

        createTaskInput.append(createTask.element);
        createTaskButtons.append(createTask.element);
        createTaskAddBtn.append(createTaskButtons.element);
        createTaskCancelBtn.append(createTaskButtons.element);
        createTaskInput.element.placeholder = 'Add task..';
        createTaskAddBtn.element.innerHTML = 'Add';

        columnBox.append(columnWrap.element);
        columnTitle.append(columnBox.element);
        columnName.append(columnTitle.element);
        columnRemove.append(columnTitle.element);
        columnRemoveImg.append(columnRemove.element);
        tasks.append(columnBox.element);
        createTask.append(columnBox.element);
        createTaskInput.element.addEventListener('focus', () => {
            createTaskButtons.element.classList.add('column-create__buttons_visible');
            createTaskInput.element.placeholder = 'Enter task title...';
            createTaskInput.element.value = '';
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            createTaskAddBtn.element.addEventListener('click', async () => {
                if (createTaskInput.element.value) {
                    preloader.start();
                    await boardController.createNewTask(column._id, createTaskInput.element.value, 0);
                    await this.update();
                    preloader.stop();
                } else createTaskInput.element.focus();
            });
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            createTaskCancelBtn.element.addEventListener('click', async () => {
                createTaskButtons.element.classList.remove('column-create__buttons_visible');
                createTaskInput.element.value = 'Add task ...';
            });
        });
        columnBox.element.draggable = true;
        columnBox.element.dataset.column = column._id;
        columnWrap.element.dataset.column = column._id;
        columnBox.element.dataset.order = String(column.order);
        columnName.element.value = column.title;
        columnRemoveImg.element.src = '../assets/icons/remove-task.png';

        columnBox.element.addEventListener('dragstart', (event) => {
            const target = event.currentTarget as HTMLElement;
            const parent = target.parentElement as HTMLElement;
            setTimeout(() => {
                target.classList.add('column_hide');
                parent.classList.add('column__wrapper_hide');
            }, 0);
            state.dragElement = target;
            state.dragZone = parent;
            state.dragStartId = target.dataset.column as string;
        });

        columnBox.element.addEventListener('dragend', (event) => {
            (event.target as HTMLElement).classList.remove('column_hide');
        });

        columnWrap.element.addEventListener('dragover', (event) => {
            event.preventDefault();
        });

        columnWrap.element.addEventListener('dragenter', (event) => {
            const target = event.currentTarget as HTMLElement;
            const child = target.firstElementChild as HTMLElement;
            state.dragEnterId = child.dataset.column as string;
            (state.dragZone as HTMLElement).append(child);
            target.append(state.dragElement as HTMLElement);
            target.classList.add('column__wrapper_hide');
        });

        columnWrap.element.addEventListener('dragleave', (event) => {
            state.dragZone = event.currentTarget as HTMLElement;
            (event.currentTarget as HTMLElement).classList.remove('column__wrapper_hide');
        });

        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        columnWrap.element.addEventListener('drop', async (event) => {
            event.preventDefault();
            (state.dragElement as HTMLElement).classList.remove('column_hide');
            (event.currentTarget as HTMLElement).classList.remove('column__wrapper_hide');
            preloader.start();
            await boardController.updateColumnSet();
            preloader.stop();
        });

        columnName.element.addEventListener('mouseup', () => {
            columnName.element.select();
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            document.addEventListener('keyup', async (event) => {
                if (event.code === 'Enter') columnName.element.blur();
            });
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            columnName.element.addEventListener('focusout', async () => {
                preloader.start();
                await boardController.updateColumnById(column._id, columnName.element.value);
                preloader.stop();
            });
        });

        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        columnRemove.element.addEventListener('click', async () => {
            preloader.start();
            await boardController.deleteColumnById(column._id);
            await this.update();
            preloader.stop();
        });
        return columnWrap.element;
    }

    async update() {
        const newData = this.render();
        const oldData = document.querySelector('.board') as HTMLElement;
        oldData.replaceWith(await newData);
    }
}

export default new BoardView();
