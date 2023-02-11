import { Control } from './Control';

export function validation() {
    let result = true;

    function removeError(input: HTMLInputElement) {
        const parent = input.parentNode as HTMLLabelElement;
        if (input.classList.contains('auth__form_error')) {
            if (parent) {
                parent.querySelector('.auth__form_error-label')?.remove();
            }
            input.classList.remove('auth__form_error');
        }
    }

    function createError(input: HTMLInputElement, message: string) {
        const parent = input.parentNode;
        input.classList.add('auth__form_error');
        const errorLabel = new Control<HTMLElement>('label', 'auth__form_error-label');
        parent?.append(errorLabel.element);
        errorLabel.element.textContent = message;
    }

    const inputs: NodeListOf<HTMLInputElement> = document.querySelectorAll('.auth__form-input');
    inputs.forEach((input: HTMLInputElement) => {
        removeError(input);

        if (input.dataset.minLength) {
            if (input.value.length < Number(input.dataset.minLength)) {
                removeError(input);
                createError(input, `Minimum length ${input.dataset.minLength}`);
                result = false;
            }
        }

        if (input.dataset.maxLength) {
            if (input.value.length > Number(input.dataset.maxLength)) {
                removeError(input);
                createError(input, `Maximum length ${input.dataset.maxLength}`);
                result = false;
            }
        }

        if (input.value === '') {
            removeError(input);
            createError(input, 'The field is empty!');
            result = false;
        }
    });

    return result;
}
