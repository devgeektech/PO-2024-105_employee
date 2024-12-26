
export interface IForum{
    _id: string,
    title: string,
    description: string,
    image: string,
    votes: string[],
    comments: IComment[],
    createdAt: string,
    createdBy: IUser,
}

export interface IComment{
    _id: string,
    message: string,
    image: string,
    createdAt: string,
    addedBy: IUser,
    replies: IReply[]
}

export interface IReply{
    _id: string,
    message: string,
    addedBy: IUser,
    createdAt: string,
}