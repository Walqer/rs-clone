import { urlParams, urls } from './apiConfig';
import { fetchApi } from './helper';
import { Task, TaskOrder } from '../../../spa/types';

export async function getTasks(token: string, boardId: string, columnId: string): Promise<Task[] | string> {
    const url = `${urls.boards}/${boardId}/${urlParams.columns}/${columnId}/${urlParams.tasks}`;
    const res = await fetchApi(url, 'GET', token);
    if (res.status === 200) return (await res.body) as unknown as Task[];
    return 'error';
}

export async function createTask(
    token: string,
    boardId: string,
    columnId: string,
    title: string,
    order: number,
    description: string,
    userId: number,
    users: string[]
): Promise<Task | string> {
    const url = `${urls.boards}/${boardId}/${urlParams.columns}/${columnId}/${urlParams.tasks}`;
    const task = { title, order, description, userId, users };
    const res = await fetchApi(url, 'POST', token, task);
    if (res.status === 200) return (await res.body) as unknown as Task;
    if (res.status === 400) return 'Bad Request';
    return 'error';
}

export async function getTaskById(token: string, boardId: string, columnId: string, taskId: string): Promise<Task | string> {
    const url = `${urls.boards}/${boardId}/${urlParams.columns}/${columnId}/${urlParams.tasks}/${taskId}`;
    const res = await fetchApi(url, 'GET', token);
    if (res.status === 200) return (await res.body) as unknown as Task;
    if (res.status === 404) return 'Column was not founded!';
    return 'error';
}

export async function updateTaskById(
    token: string,
    boardId: string,
    columnId: string,
    taskId: string,
    title: string,
    order: number,
    description: string,
    userId: number,
    users: string[]
): Promise<Task | string> {
    const url = `${urls.boards}/${boardId}/${urlParams.columns}/${columnId}/${urlParams.tasks}/${taskId}`;
    const task = { title, order, description, userId, users };
    const res = await fetchApi(url, 'PUT', token, task);
    if (res.status === 200) return (await res.body) as unknown as Task;
    if (res.status === 400) return 'Bad Request';
    return 'error';
}

export async function deleteTaskById(token: string, boardId: string, columnId: string, taskId: string): Promise<Task | string> {
    const url = `${urls.boards}/${boardId}/${urlParams.columns}/${columnId}/${urlParams.tasks}/${taskId}`;
    const res = await fetchApi(url, 'DELETE', token);
    if (res.status === 200) return (await res.body) as unknown as Task;
    return 'error';
}

export async function getTasksSet(token: string, userId: string, taskIds: string[], searchText: string): Promise<Task[] | string> {
    const url = `${urls.tasksSet}?ids=${taskIds.toString()}&userId=${userId}&search=${searchText}`;
    const res = await fetchApi(url, 'GET', token);
    if (res.status === 200) return (await res.body) as unknown as Task[];
    return 'error';
}

export async function updateTasksSet(token: string, taskOrder: TaskOrder[]): Promise<Task[] | string> {
    const url = `${urls.tasksSet}`;
    const res = await fetchApi(url, 'PATCH', token, taskOrder);
    if (res.status === 200) return (await res.body) as unknown as Task[];
    if (res.status === 400) return 'Bad Request';
    return 'error';
}

export async function getTasksByBoardId(token: string, boardId: string): Promise<Task[] | string> {
    const url = `${urls.tasksSet}/${boardId}`;
    const res = await fetchApi(url, 'GET', token);
    if (res.status === 200) return (await res.body) as unknown as Task[];
    if (res.status === 400) return 'Bad Request';
    return 'error';
}
