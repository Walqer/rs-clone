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
                const board = new Control<HTMLLinkElement>('li', 'workspace__user-boards-list-item');
                // if (isFavourite) board.element.classList.add('starred');
                const boardTitle = new Control<HTMLSpanElement>('span', 'workspace__user-boards-list-item-title');
                // board.element.style.backgroundColor = item.bgColor;
                board.element.dataset.id = item._id;
                // if (item.bgImg) board.element.style.backgroundImage = `url(${item.bgImg})`;
                boardTitle.element.textContent = item.title;
                boardTitle.append(board.element);
                board.append(userBoardsList.element);
            });
        }
        const NewBoard = new Control<HTMLLinkElement>('li', 'workspace__user-boards-list-item', 'add-new-board');
        NewBoard.element.textContent = 'Create new board';
        NewBoard.append(userBoardsList.element);
        return section.element;
    }
}

export default new BoardListView();
