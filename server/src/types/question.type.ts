import { User } from "./user.type";

export type Question = {
    id: string;
    title: string;
    body: string;
    rating: number;
    createdBy: User;
    createdAt: Date;
    comments: Array<Comment>;
}