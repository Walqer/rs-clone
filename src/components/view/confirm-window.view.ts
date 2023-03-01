import { Control } from '../../utils/Control';

class ConfirmWindowView {
    render(message: string): HTMLElement {
        const wrap = new Control<HTMLElement>('div', 'confirm__wrapper');
        const confirm = new Control<HTMLElement>('div', 'confirm');
        const confirmMessage = new Control<HTMLElement>('h2', 'confirm__message');
        const yesBtn = new Control<HTMLButtonElement>('button', 'confirm__button_yes');
        const noBtn = new Control<HTMLButtonElement>('button', 'confirm__button_no');

        confirmMessage.element.textContent = message;
        confirmMessage.append(confirm.element);
        yesBtn.element.textContent = 'Confirm';
        yesBtn.append(confirm.element);
        noBtn.element.textContent = 'Cancel';
        noBtn.append(confirm.element);
        confirm.append(wrap.element);

        noBtn.element.addEventListener('click', () => {
            wrap.remove();
        });

        return wrap.element;
    }
}

export default new ConfirmWindowView();
