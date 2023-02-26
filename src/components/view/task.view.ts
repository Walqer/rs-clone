import { getTaskById, updateTaskTitle, updateTaskDescription } from '../../api/tasks';
import { Task } from '../../spa/types';
import { state } from '../../store/state';
import { Control } from '../../utils/Control';
import preloader from '../../utils/Preloader';
import boardController from '../controller/board.controller';

class TaskView {
    async render(boardId: string, columnId: string, taskId: string) {
        const task = (await getTaskById(state.token as string, boardId, columnId, taskId)) as Task;
        const modal = new Control<HTMLElement>('div', 'task-modal__content');
        const modalContent = new Control<HTMLElement>('div', 'task-modal__content__wrapper');
        modalContent.append(modal.element);
        const title = new Control<HTMLTextAreaElement>('textarea', 'task-modal__title', 'textarea');
        const description = new Control<HTMLTextAreaElement>('textarea', 'task-modal__description', 'textarea');
        const removeTask = new Control<HTMLDivElement>('div', 'task-modal__remove');
        title.append(modalContent.element);
        title.element.innerText = task.title;
        description.append(modalContent.element);
        removeTask.append(modalContent.element);
        description.element.innerHTML = task.description;
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        title.element.addEventListener('change', async () => {
            task.title = title.element.value;
            await updateTaskTitle(
                state.token as string,
                state.boardId as string,
                state.columnId as string,
                state.taskId as string,
                task.title
            );
        });
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        description.element.addEventListener('change', async () => {
            task.description = description.element.value;
            await updateTaskDescription(
                state.token as string,
                state.boardId as string,
                state.columnId as string,
                state.taskId as string,
                task.description
            );
        });
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        removeTask.element.addEventListener('click', async () => {
            preloader.start();
            // eslint-disable-next-line @typescript-eslint/no-unsafe-call
            await boardController.deleteTaskById();
            preloader.stop();
        });
        const userItem = new Control<HTMLElement>('div', 'task-modal__user');
        userItem.append(modalContent.element);
        if (state.boardOwner) userItem.element.innerText = `${state.boardOwner.login} - ${state.boardOwner.name}`;

        const modalFooter = new Control<HTMLElement>('div', 'task-modal__content__footer');
        modalFooter.append(modal.element);

        return modal.element;
    }

    async update(boardId: string, columnId: string, taskId: string) {
        const newData = await this.render(boardId, columnId, taskId);
        const oldData = document.querySelector('.task-modal__content') as HTMLDivElement;
        oldData.replaceWith(newData);
    }
}

export default new TaskView();
