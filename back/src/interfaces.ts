export interface IMessage {
    content: string,
    user: string
}

export interface IRoom {
    name: string,
    description: string,
    createdBy: string,
    users?: string[],
    messages?: IMessage[]
}