import { createColumn, getColumns, deleteColumnById, updateColumnById, getColumnsSet, createColumnsSet } from '../../api/columns';
import { Column, ColumnList } from '../../spa/types';
import { state } from '../../store/state';

class BoardModel {
    async createColumn(title: string) {
        state.countColumns += 1;
        await createColumn(state.token as string, state.boardId as string, title, state.countColumns);
    }

    async getColumns() {
        const columnIds: string[] = [];
        const columnList: ColumnList[] = [];
        const columns = await getColumns(state.token as string, state.boardId as string);
        if (typeof columns !== 'string') {
            columns.forEach((column) => {
                columnIds.push(column._id);
                columnList.push({
                    title: column.title,
                    order: column.order,
                    boardId: column.boardId,
                })
            });
            columnList.sort((a, b) => a.order > b.order ? 1 : -1);
            const resp = await createColumnsSet(state.token as string, columnList)
            state.columns = (await getColumnsSet(state.token as string, state.userId as string, columnIds)) as Column[];
            console.log(resp);
        }
    }

    async deleteColumnById(id: string) {
        await deleteColumnById(state.token as string, state.boardId as string, id);
    }

    async updateColumnById(columnId: string, title: string) {
        await updateColumnById(state.token as string, state.boardId as string, columnId, title, 0);
    }
}

export default new BoardModel();
