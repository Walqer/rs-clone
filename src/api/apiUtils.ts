import { Board } from "../spa/types";
import { getBoardById, updateBoardFavourites } from "./boards";

export async function addToFavourites(token: string, boardId: string, userId: string): Promise<Board | string> {
  const board = await getBoardById(token, boardId);
  if (typeof board === 'string') return board;
  
  const favourites = board.usersFavourite;
  if (favourites.includes(userId)) return board;
  favourites.push(userId);
  const update = await updateBoardFavourites(token, boardId, favourites);
  return update;
}

export async function removeFromFavourites(token: string, boardId: string, userId: string): Promise<Board | string> {
  const board = await getBoardById(token, boardId);
  if (typeof board === 'string') return board;
  
  const favourites = board.usersFavourite;
  const index = favourites.indexOf(userId);
  if (index === -1) return board;
  favourites.splice(index, 1);
  const update = await updateBoardFavourites(token, boardId, favourites);
  return update;
}
