export interface IPost {
    _id: number;
    title: string;
    text: string;
    tags: string[];
    imageUrl: string;
    user: IUser;
}

export interface IUser {
    _id: number;
    fullName: string;
    email: string;
    passwordHash?: string;
    avatarUrl?: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}
