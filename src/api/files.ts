import { urls } from './apiConfig';
import { fetchApi, fetchApiFormData } from './helper';
import { File } from '../spa/types';

export async function getFiles(token: string, userId: string, taskId: string, columnIds: string[]): Promise<File[] | string> {
    const url = `${urls.files}?ids=${columnIds.toString()}&userId=${userId}&taskId=${taskId}`;
    const res = await fetchApi(url, 'GET', token);
    if (res.status === 200) return (await res.body) as unknown as File[];
    return 'error';
}

export async function uploadFile(token: string, formElement: HTMLFormElement): Promise<File[] | string> {
    const url = `${urls.files}`;
    const res = await fetchApiFormData(url, 'POST', token, formElement);
    if (res.status === 200) return (await res.body) as unknown as File[];
    if (res.status === 400) return 'Bad Request';
    return 'error';
}

export async function getFilesByBoardId(token: string, boardId: string): Promise<File[] | string> {
  const url = `${urls.files}/${boardId}`;
  const res = await fetchApi(url, 'GET', token);
  if (res.status === 200) return (await res.body) as unknown as File[];
  return 'error';
}

export async function deleteFileById(token: string, fileId: string): Promise<File | string> {
  const url = `${urls.boards}/${fileId}`;
  const res = await fetchApi(url, 'DELETE', token);
  if (res.status === 200) return (await res.body) as unknown as File;
  return 'error';
}

