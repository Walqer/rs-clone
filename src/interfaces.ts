export interface Board {
    _id: string;
    title: string;
    owner: string;
    bgColor: string;
    bgImg: string;
    isFavourite: boolean;
    users: string[];
}
