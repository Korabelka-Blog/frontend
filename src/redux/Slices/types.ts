export interface IPost {
    _id: string;
    title: string;
    text: string;
    tags: string[];
    imageUrl: string;
    user: IUser;
}

export interface IUser {
    _id: string;
    fullName: string;
    email: string;
    passwordHash?: string;
    avatarUrl?: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}