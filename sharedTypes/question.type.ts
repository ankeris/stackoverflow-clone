import { User } from "./user.type";

export type Question = {
    _id?: string;
    title: string;
    body?: string;
    upvotesCount: number;
    createdBy: User;
    createdAt: Date;
    upvotes?: Array<string>;
};
