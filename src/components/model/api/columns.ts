import { urlParams, urls } from './apiConfig';
import { fetchApi } from './helper';
import { Column, ColumnList, ColumnOrder } from '../../../spa/types';

export async function getColumns(token: string, boardId: string): Promise<Column[] | string> {
    const url = `${urls.boards}/${boardId}/${urlParams.columns}`;
    const res = await fetchApi(url, 'GET', token);
    if (res.status === 200) return (await res.body) as unknown as Column[];
    return 'error';
}

export async function createColumn(token: string, boardId: string, title: string, order: number): Promise<Column | string> {
    const url = `${urls.boards}/${boardId}/${urlParams.columns}`;
    const column = { title, order };
    const res = await fetchApi(url, 'POST', token, column);
    if (res.status === 200) return (await res.body) as unknown as Column;
    if (res.status === 400) return 'Bad Request';
    return 'error';
}

export async function getColumnById(token: string, boardId: string, columnId: string): Promise<Column | string> {
    const url = `${urls.boards}/${boardId}/${urlParams.columns}/${columnId}`;
    const res = await fetchApi(url, 'GET', token);
    if (res.status === 200) return (await res.body) as unknown as Column;
    if (res.status === 404) return 'Column was not founded!';
    return 'error';
}

export async function updateColumnById(
    token: string,
    boardId: string,
    columnId: string,
    title: string,
    order: number
): Promise<Column | string> {
    const url = `${urls.boards}/${boardId}/${urlParams.columns}/${columnId}`;
    const column = { title, order };
    const res = await fetchApi(url, 'PUT', token, column);
    if (res.status === 200) return (await res.body) as unknown as Column;
    if (res.status === 400) return 'Bad Request';
    return 'error';
}

export async function deleteColumnById(token: string, boardId: string, columnId: string): Promise<Column | string> {
    const url = `${urls.boards}/${boardId}/${urlParams.columns}/${columnId}`;
    const res = await fetchApi(url, 'DELETE', token);
    if (res.status === 200) return (await res.body) as unknown as Column;
    return 'error';
}

export async function getColumnsSet(token: string, userId: string, columnIds: string[]): Promise<Column[] | string> {
    const url = `${urls.columnsSet}?ids=${columnIds.toString()}&userId=${userId}`;
    const res = await fetchApi(url, 'GET', token);
    if (res.status === 200) return (await res.body) as unknown as Column[];
    return 'error';
}

export async function updateColumnsSet(token: string, columnOrder: ColumnOrder[]): Promise<Column[] | string> {
    const url = `${urls.columnsSet}`;
    const res = await fetchApi(url, 'PATCH', token, columnOrder);
    if (res.status === 200) return (await res.body) as unknown as Column[];
    if (res.status === 400) return 'Bad Request';
    return 'error';
}

export async function createColumnsSet(token: string, columnList: ColumnList[]): Promise<Column[] | string> {
    const url = `${urls.columnsSet}`;
    const res = await fetchApi(url, 'POST', token, columnList);
    if (res.status === 200) return (await res.body) as unknown as Column[];
    if (res.status === 400) return 'Bad Request';
    return 'error';
}
