import { User } from "./user.type";
import { Comment } from "./comment.type";

export type Question = {
    _id?: string;
    title: string;
    body?: string;
    upvotesCount: number;
    createdBy: User;
    createdAt: Date;
    upvotes?: Array<User>;
    comments?: Array<Comment>;
}