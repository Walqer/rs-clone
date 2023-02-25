/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { updateTaskTitle } from '../../api/tasks';
import { state } from '../../store/state';
import { Control } from '../../utils/Control';

class TaskView {
    render(taskId: string) {
        const modal = new Control<HTMLElement>('div', 'task-modal__content');
        const modalContent = new Control<HTMLElement>('div', 'task-modal__content__wrapper');
        modalContent.append(modal.element);

        const owner = new Control<HTMLElement>('h3', 'task-modal__title');
        owner.append(modalContent.element);
        owner.element.innerText = taskId;
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
            this.update(taskId);
        });

        return modal.element;
    }

    update(taskId: string) {
        const newData = this.render(taskId);
        const oldData = document.querySelector('.task-modal__content') as HTMLDivElement;
        oldData.replaceWith(newData);
    }
}

export default new TaskView();
