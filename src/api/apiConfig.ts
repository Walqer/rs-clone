const url = 'https://final-task-backend-production-c474.up.railway.app';
const port = '';

export const urlParams = {
    boards: '/boards',
    columns: '/columns',
    tasks: '/tasks',
};

export const urls = {
    mainUrl: `${url}${port}`,
    signin: `${url}${port}/auth/signin`,
    signup: `${url}${port}/auth/signup`,
    users: `${url}${port}/users`,
    boards: `${url}${port}/boards`,
    boardsSet: `${url}${port}/boardsSet`,
    columnsSet: `${url}${port}/columnsSet`,
    tasksSet: `${url}${port}/tasksSet`,
};
