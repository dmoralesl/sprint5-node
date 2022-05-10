export interface IMessage {
    content: string,
    user:  IUser,
    createdAt?: Date
}

export interface IRoom {
    _id?: string,
    name: string,
    description: string,
    createdBy: IUser,
    users: IUser[],
    messages: IMessage[],
    createdAt?: Date
}

export interface IUser {
    _id?: string,
    name: string,
    createdAt?: Date,
    color?: string
}