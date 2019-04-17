import { User } from "./user.type";
import { Question } from "./question.type";

export type Comment = {
    _id: string;
    body: string;
    upvotesCount: number;
    upvotes: Array<string | User>;
    createdBy: User;
    question: Question;
    createdAt: Date
}