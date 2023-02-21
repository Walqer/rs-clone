// const url = 'https://final-task-backend-production-c474.up.railway.app'; //Railway
const url = 'https://mini-trello-back.onrender.com';  // Render
const port = '';

export const urlParams = {
    boards: 'boards',
    columns: 'columns',
    tasks: 'tasks',
};

export const urls = {
    mainUrl: `${url}${port}`,
    signin: `${url}${port}/auth/signin`,
    signup: `${url}${port}/auth/signup`,
    users: `${url}${port}/users`,
    boards: `${url}${port}/boards`,
    boardsSet: `${url}${port}/boardsSet`,
    favouriteBoards: `${url}${port}/favourites`,
    columnsSet: `${url}${port}/columnsSet`,
    tasksSet: `${url}${port}/tasksSet`,
    files: `${url}${port}/file`,
};
