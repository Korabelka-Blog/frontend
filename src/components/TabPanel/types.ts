export interface IPost {
    _id: number;
    title: string;
    text: string;
    tags: string[];
    imageUrl: string;
    userImg?: string;
    userId: string;
    userName: string;
}