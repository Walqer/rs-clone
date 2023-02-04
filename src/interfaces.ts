export interface Board {
    _id: string;
    title: string;
    owner: string;
    // bgColor: string; этого нет б вэкэнде
    // bgImg: string; этого нет б вэкэнде
    // isFavourite: boolean; этого нет б вэкэнде
    users: string[];
}
