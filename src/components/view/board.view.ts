/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Board, Column } from '../../spa/types';
import { state } from '../../store/state';
import { Control } from '../../utils/Control';
import boardController from '../controller/board.controller';
import preloader from '../../utils/Preloader';
import manageUsersView from './manage-users.view';
import taskView from './task.view';

class BoardView {
    async render() {
        const board = new Control<HTMLElement>('div', 'board');
        const header = new Control<HTMLElement>('div', 'board__header');
        const title = new Control<HTMLElement>('h2', 'board__header-title');
        const search = new Control<HTMLElement>('div', 'board__header-search');
        const users = new Control<HTMLElement>('div', 'board__header-users');
        const usersButton = new Control<HTMLButtonElement>('button', 'white-button');
        const columnsWrapper = new Control<HTMLElement>('div', 'board__columns-wrapper');
        const columns = new Control<HTMLElement>('div', 'board__columns');
        const createColumn = new Control<HTMLElement>('div', 'column-create');
        const createColumnInput = new Control<HTMLInputElement>('input', 'column-create__input');
        const createColumnButtons = new Control<HTMLElement>('div', 'column-create__buttons', 'column-create__buttons_hide');
        const createColumnAddBtn = new Control<HTMLElement>('a', 'column-create__add-btn', 'column-create__add-btn');
        const createColumnCancelBtn = new Control<HTMLElement>('a', 'column-create__cancel-btn', 'column-create__cancel-btn');
        const usersModal = new Control<HTMLDivElement>('div', 'users-modal');
        const taskModal = new Control<HTMLDivElement>('div', 'task-modal');

        usersModal.append(board.element);
        taskModal.append(board.element);
        header.append(board.element);
        title.append(header.element);
        search.append(header.element);
        users.append(header.element);
        usersButton.append(users.element);
        usersButton.element.innerHTML = 'Users';
        columnsWrapper.append(board.element);
        columns.append(columnsWrapper.element);
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
        title.element.textContent = `Board: ${((await boardController.getBoard()) as Board).title}`;

        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        usersButton.element.addEventListener('click', async () => {
            if (usersModal.element.innerHTML === '') {
                preloader.start();
                await boardController.getBoardUsers();
                preloader.stop();
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

        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        taskModal.element.addEventListener('click', async (e) => {
            const { target } = e;
            if (
                (target as HTMLElement).classList.contains('task-modal') ||
                (target as HTMLElement).classList.contains('task-modal__remove')
            ) {
                taskModal.element.style.display = 'none';
                preloader.start();
                await this.update();
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

        const tasksInColumn = (await boardController.getTasks(column._id)).sort((a, b) => a.order - b.order);
        state.columnTasks.push(tasksInColumn);
        // eslint-disable-next-line no-restricted-syntax
        for (const task of tasksInColumn) {
            const taskItemWrap = new Control<HTMLElement>('li', 'column__task-wrapper');
            const taskItem = new Control<HTMLElement>('div', 'column__task');
            taskItem.element.textContent = task.title;
            taskItem.element.draggable = true;
            taskItem.element.dataset.task = task._id;
            taskItem.element.dataset.column = task.columnId;
            taskItem.append(taskItemWrap.element);
            taskItemWrap.element.dataset.task = task._id;
            taskItemWrap.element.dataset.column = task.columnId;
            taskItemWrap.append(tasks.element);
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            taskItem.element.addEventListener('click', async () => {
                const taskModal = document.querySelector('.task-modal') as HTMLElement;
                taskModal.innerHTML = '';
                state.columnId = task.columnId;
                state.taskId = task._id;
                taskModal.append(await taskView.render(state.boardId as string, column._id, task._id));
                taskModal.style.display = 'block';
            });

            taskItemWrap.element.addEventListener('dragenter', (event) => {
                const target = event.currentTarget as HTMLElement;
                const child = target.firstElementChild as HTMLElement;
                if (state.dragElement?.classList.contains('column__task') && child !== state.dragElement) {
                    if (state.dragZone?.dataset.column !== target.dataset.column) {
                        target.insertAdjacentElement('afterend', state.dragZone as HTMLElement);
                        (state.dragZone as HTMLElement).dataset.column = target.dataset.column;
                    }
                    state.dragZone?.appendChild(child);
                    target.appendChild(state.dragElement);
                    // target.dataset.task = (target.firstElementChild as HTMLElement).dataset.task;
                    target.classList.add('column__wrapper_hide');
                }
            });

            taskItemWrap.element.addEventListener('dragleave', (event) => {
                state.dragZone = event.currentTarget as HTMLElement;
                // (event.currentTarget as HTMLElement).classList.remove('column__wrapper_hide');
            });

            taskItemWrap.element.addEventListener('dragover', (event) => {
                event.preventDefault();
            });

            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            taskItemWrap.element.addEventListener('drop', async (event) => {
                event.preventDefault();
                const target = event.currentTarget as HTMLElement;
                // target.dataset.task = (target.firstElementChild as HTMLElement).dataset.task;
                target.classList.remove('column__wrapper_hide');
                preloader.start();
                await boardController.updateTasksSet(target.dataset.column as string, target.dataset.task as string);
                preloader.stop();
            });
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
        tasks.element.dataset.tasks = column._id;
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
        columnBox.element.dataset.id = column._id;
        columnWrap.element.dataset.id = column._id;
        columnBox.element.dataset.order = String(column.order);
        columnName.element.value = column.title;
        columnRemoveImg.element.src = '../assets/icons/remove-task.png';

        columnBox.element.addEventListener('dragstart', (event) => {
            const target = event.target as HTMLElement;
            const parent = target.parentElement as HTMLElement;
            setTimeout(() => {
                target.classList.add('column_hide');
                parent.classList.add('column__wrapper_hide');
            }, 0);
            state.dragElement = target;
            state.dragZone = parent;
            state.dragStartId = target.dataset.id as string;
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
            if (state.dragElement?.classList.contains('column')) {
                state.dragEnterId = child.dataset.id as string;
                (state.dragZone as HTMLElement).append(child);
                target.append(state.dragElement);
                target.classList.add('column__wrapper_hide');
            } else if (state.dragElement?.classList.contains('column__task')) {
                const taskList = document.querySelector(`[data-tasks = '${target.dataset.id as string}']`) as HTMLElement;
                const isEmptyColumns = taskList.childElementCount;
                if (!isEmptyColumns) {
                    taskList.append(state.dragZone as HTMLElement);
                    (state.dragZone as HTMLElement).dataset.column = taskList.dataset.tasks;
                }
            }
        });

        columnWrap.element.addEventListener('dragleave', (event) => {
            if (state.dragElement?.classList.contains('column')) {
                state.dragZone = event.currentTarget as HTMLElement;
                (event.currentTarget as HTMLElement).classList.remove('column__wrapper_hide');
            }
        });

        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        columnWrap.element.addEventListener('drop', async (event) => {
            event.preventDefault();
            if (state.dragElement?.classList.contains('column')) {
                state.dragElement.classList.remove('column_hide');
                (event.currentTarget as HTMLElement).classList.remove('column__wrapper_hide');
                preloader.start();
                await boardController.updateColumnSet();
                preloader.stop();
            }
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
