import { Board } from '../../interfaces';

class BoardListModel {
    getUserBoards(): Board[] {
        return [
            {
                _id: '1',
                title: 'Board title1',
                owner: 'userId of owner',
                bgColor: 'green',
                bgImg: '../../../assets/img/board-background.jpg',
                isFavourite: true,
                users: ['userId of invited user #1', 'userId of invited user #2'],
            },
            {
                _id: '2',
                title: 'Board title2',
                owner: 'userId of owner',
                bgColor: 'green',
                bgImg: 'unset',
                isFavourite: false,
                users: ['userId of invited user #1', 'userId of invited user #2'],
            },
            {
                _id: '3',
                title: 'Board title3',
                owner: 'userId of owner',
                bgColor: 'green',
                bgImg: 'unset',
                isFavourite: true,
                users: ['userId of invited user #1', 'userId of invited user #2'],
            },
        ];
    }
}

export default new BoardListModel();
