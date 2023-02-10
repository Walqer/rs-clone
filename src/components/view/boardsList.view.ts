import { updateBoardColor, updateBoardFavourites, updateBoardImage } from '../../api/boards';
import { state } from '../../store/state';
import { Control } from '../../utils/Control';
import boardListController from '../controller/boardList.controller';

class BoardListView {
    async render(): Promise<HTMLElement> {
        const section = new Control<HTMLElement>('section', 'workspace');
        const topbar = new Control<HTMLDivElement>('div', 'workspace__topbar');
        const sectionTitle = new Control<HTMLTitleElement>('h2', 'workspace__title');

        sectionTitle.append(topbar.element);
        topbar.append(section.element);
        sectionTitle.element.textContent = 'WorkSpace';

        const userBoardsTitle = new Control<HTMLTitleElement>('h3', 'workspace__boards-title');
        userBoardsTitle.element.textContent = 'YOUR BOARDS';
        userBoardsTitle.append(section.element);

        const userBoardsList = new Control<HTMLUListElement>('ul', 'workspace__user-boards-list');
        userBoardsList.append(section.element);
        const userBoardsFromDatabase = await boardListController.getUserBoards();
        if (userBoardsFromDatabase !== 'error') {
            userBoardsFromDatabase.forEach((item) => {
                // const { isFavourite } = item;
                const board = new Control<HTMLLIElement>('li', 'workspace__user-boards-list-item');
                const boardLink = new Control<HTMLLinkElement>('a', 'workspace__user-boards-list-item-link');
                // if (isFavourite) board.element.classList.add('starred');
                const boardTitle = new Control<HTMLSpanElement>('span', 'workspace__user-boards-list-item-title');

                board.element.style.backgroundColor = `${item.bgColor}`;

                board.element.dataset.id = item._id;
                if (item.bgImg) board.element.style.backgroundImage = `url(${item.bgImg})`;
                boardTitle.element.textContent = item.title;
                boardLink.element.href = `/board/${item._id}`;
                boardLink.element.dataset.link = '';
                boardLink.append(board.element);
                boardTitle.append(boardLink.element);
                board.append(userBoardsList.element);
            });
        }
        const NewBoard = new Control<HTMLLinkElement>('li', 'workspace__user-boards-list-item', 'add-new-board');
        NewBoard.element.textContent = 'Create new board';
        NewBoard.append(userBoardsList.element);
        const newBoardMainWrapper = new Control<HTMLDivElement>('div', 'new-board-wrapper');
        const newBoardMain = new Control<HTMLDivElement>('div', 'new-board');
        const newBoardCloseBtn = new Control<HTMLDivElement>('span', 'close-btn');
        newBoardCloseBtn.element.textContent = '×';
        newBoardCloseBtn.append(newBoardMain.element);
        newBoardMain.append(newBoardMainWrapper.element);
        const newBoardTitle = new Control<HTMLTitleElement>('h3', 'new-board__title');
        newBoardTitle.append(newBoardMain.element);
        newBoardTitle.element.textContent = 'Создать доску';

        const newBoardBgtitle = new Control<HTMLTitleElement>('h3', 'new-board__inner-title');
        newBoardBgtitle.append(newBoardMain.element);
        newBoardBgtitle.element.textContent = 'Фон';

        const newBoardBgColors = new Control<HTMLUListElement>('ul', 'new-board__bg-colors');
        newBoardBgColors.append(newBoardMain.element);
        const newBoardColorsList = boardListController.getBoardColorList();
        newBoardColorsList.forEach((colorHex) => {
            const colorItem = new Control<HTMLLIElement>('li', 'new-board__bg-color');
            colorItem.element.style.backgroundColor = `#${colorHex}`;
            colorItem.element.dataset.color = `#${colorHex}`;
            colorItem.append(newBoardBgColors.element);
        });

        const newBoardName = new Control<HTMLInputElement>('h3', 'new-board__inner-title');
        newBoardName.append(newBoardMain.element);
        newBoardName.element.textContent = 'Заголовок доски';
        const newBoardNameInput = new Control<HTMLInputElement>('input', 'new-board__input');
        newBoardNameInput.element.required = true;
        newBoardNameInput.element.name = 'name';
        const newBoardColorInput = new Control<HTMLInputElement>('input', 'new-board__input', 'visually-hidden');
        const newBoardButton = new Control<HTMLButtonElement>('button', 'new-board__button', 'button');
        newBoardButton.element.textContent = 'Создать';
        const newBoardForm = new Control<HTMLFormElement>('form', 'new-board__inner-form');
        newBoardNameInput.append(newBoardForm.element);

        newBoardColorInput.append(newBoardForm.element);
        newBoardColorInput.element.value = '#0079BF';
        newBoardColorInput.element.name = 'color';
        newBoardButton.append(newBoardForm.element);
        newBoardForm.append(newBoardMain.element);
        newBoardBgColors.element.addEventListener('click', (event) => {
            const target = event.target as HTMLLIElement;
            if (target.classList.contains('new-board__bg-color')) {
                const colors = newBoardBgColors.element.children as unknown as HTMLLIElement[];
                // eslint-disable-next-line no-restricted-syntax
                for (const color of colors) {
                    color.classList.remove('new-board__bg-color_selected');
                }
                newBoardColorInput.element.value = target.dataset.color ? target.dataset.color : 'green';
                target.classList.add('new-board__bg-color_selected');
            }
        });

        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        newBoardForm.element.addEventListener('submit', async (event) => {
            event.preventDefault();
            const formData = new FormData(newBoardForm.element);
            const boardName = formData.get('name') as string;
            const boardColor = formData.get('color') as string;
            newBoardMain.element.classList.remove('active');
            await boardListController.createBoard(boardName, boardColor).then(async () => {
                await this.update();
            });
        });
        NewBoard.element.addEventListener('click', () => {
            newBoardMainWrapper.element.classList.add('active');
            document.body.classList.add('no-scroll');
        });
        newBoardMainWrapper.append(section.element);
        newBoardMainWrapper.element.addEventListener('click', (event) => {
            const target = event.target as unknown as HTMLElement;
            if (target.classList.contains('active') || target === newBoardCloseBtn.element) {
                newBoardMainWrapper.element.classList.remove('active');
            }
            event.stopPropagation();
        });
        await updateBoardColor(state.token as string, '63e5450be010a7b12680473e', '#663366');
        await updateBoardImage(state.token as string, '63e5450be010a7b12680473e', 'http://www.mail.ru/abc.png');
        await updateBoardFavourites(state.token as string, '63e5450be010a7b12680473e', ['63dbdeb689825aaaf0e60384', '63dbf62b89825aaaf0e60398']);

        return section.element;
    }

    async update() {
        const newData = await this.render();
        const oldData = document.querySelector('.workspace') as HTMLElement;
        oldData.replaceWith(newData);
    }
}

export default new BoardListView();
