export interface IMessage {
    content: string,
    user: string,
    createdAt?: Date
}

export interface IRoom {
    _id?: string,
    name: string,
    description: string,
    createdBy: string,
    users: IUser[],
    messages: IMessage[],
    createdAt?: Date
}

export interface IUser {
    _id?: string,
    name: string,
    createdAt?: Date
}