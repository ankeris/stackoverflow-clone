import React, { useState, useEffect, FunctionComponent, useReducer, useContext } from "react";
import { RouteComponentProps } from "react-router";
import Typography from "@material-ui/core/Typography";
import CommentsService from "../services/comments.service";
import { Question } from "../../../sharedTypes/question.type";
import { Comment } from "../../../sharedTypes/comment.type";
import QuestionPaper from "../components/QuestionPaper";
import Loading from "../components/Loading";
import CommentItem from "../components/CommentItem";
import PostCommentForm from "../containers/PostCommentForm";
import { User } from "../../../sharedTypes/user.type";
import { AppContext } from "../App";
import { GoBack } from "../components/GoBack";
import QuestionService from "../services/questions.service";
interface Props extends RouteComponentProps<any> {}

function reducer(state, action): any {
    switch (action.type) {
        case "getQuestion":
            return { ...state, question: action.question };
        case "getComments":
            return { ...state, comments: action.comments };
        case "like":
            const likedQuestion = state.question;
            QuestionService.upvoteQuestion(likedQuestion._id, action.user._id);
            likedQuestion.upvotesCount += 1;
            return { ...state, question: likedQuestion, isLiked: true };
        case "isLiked":
            return { ...state, isLiked: action.value };
        case "dislike":
            const dislikedQuestion = state.question;
            dislikedQuestion.upvotesCount -= 1;
            return { ...state, question: dislikedQuestion };
        default:
            throw new Error();
    }
}
const initialState = {
    question: {} as Question,
    comments: [] as Array<Comment>
};
const PageQuestion: FunctionComponent<Props> = ({ history, match }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const user: User = useContext(AppContext).User;

    useEffect(() => {
        QuestionService.getOne(match.params.id).then((res: Question) => {
            if (res.upvotes!.indexOf(user._id as string) !== -1) {
                dispatch({ type: "isLiked", value: true, user });
            }
            dispatch({ type: "getQuestion", question: res });
        });
        CommentsService.getAllForQuestion(match.params.id).then((res: Array<Comment>) => {
            dispatch({ type: "getComments", comments: res });
        });
    }, []);

    function addComment(text) {
        CommentsService.postComment(match.params.id, user._id, text).then(x =>
            CommentsService.getAllForQuestion(match.params.id).then((res: Array<Comment>) => {
                dispatch({ type: "getComments", comments: res });
            })
        );
    }
    return (
        <div className="content-center content-section">
            <GoBack history={history} />
            {state.question._id ? (
                <>
                    <QuestionPaper
                        liked={state.isLiked}
                        question={state.question}
                        like={() => dispatch({ type: "like", user })}
                        dislike={() => dispatch({ type: "dislike" })}
                    />
                    <Typography variant="h5" gutterBottom>
                        Answers:
                    </Typography>
                </>
            ) : (
                <Loading />
            )}
            {state.comments
                ? state.comments.map((x: Comment) => (
                      <CommentItem key={x._id} body={x.body} upvotesCount={x.upvotesCount} createdBy={x.createdBy} createdAt={x.createdAt} />
                  ))
                : null}
            <PostCommentForm onSubmit={x => addComment(x.bodyText)} />
        </div>
    );
};

export default PageQuestion;
