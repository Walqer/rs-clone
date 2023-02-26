import { getTaskById, updateTaskById, updateTaskTitle } from '../../api/tasks';
import { Task } from '../../spa/types';
import { state } from '../../store/state';
import { Control } from '../../utils/Control';

class TaskView {
    async render(boardId: string, columnId: string, taskId: string) {
        const task = (await getTaskById(state.token as string, boardId, columnId, taskId)) as Task;
        const modal = new Control<HTMLElement>('div', 'task-modal__content');
        const modalContent = new Control<HTMLElement>('div', 'task-modal__content__wrapper');
        modalContent.append(modal.element);

        const owner = new Control<HTMLElement>('h3', 'task-modal__title');
        owner.append(modalContent.element);
        owner.element.innerText = taskId;
        console.log(task);
        const title = new Control<HTMLTextAreaElement>('textarea', 'task-modal__title', 'textarea');
        title.append(modalContent.element);
        title.element.innerText = task.title;
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        title.element.addEventListener('change', async () => {
            task.title = title.element.value;
            await updateTaskById(
                state.token as string,
                task.boardId,
                task.columnId,
                task._id,
                task.title,
                task.order,
                task.description,
                +task.userId,
                task.users
            );
            console.log(task);
        });
        const userItem = new Control<HTMLElement>('div', 'task-modal__user');
        userItem.append(modalContent.element);
        if (state.boardOwner) userItem.element.innerText = `${state.boardOwner.login} - ${state.boardOwner.name}`;

        const modalFooter = new Control<HTMLElement>('div', 'task-modal__content__footer');
        modalFooter.append(modal.element);
        const saveTaskButton = new Control<HTMLButtonElement>('button', 'white-button');
        saveTaskButton.append(modalFooter.element);
        saveTaskButton.element.innerHTML = 'Save';
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        saveTaskButton.element.addEventListener('click', async () => {
            await updateTaskTitle(
                state.token as string,
                state.boardId as string,
                state.columnId as string,
                state.taskId as string,
                'new title'
            );
            await this.update(boardId, columnId, taskId);
        });

        return modal.element;
    }

    async update(boardId: string, columnId: string, taskId: string) {
        const newData = await this.render(boardId, columnId, taskId);
        const oldData = document.querySelector('.task-modal__content') as HTMLDivElement;
        oldData.replaceWith(newData);
    }
}

export default new TaskView();
