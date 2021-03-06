import React, { useState, useEffect, useReducer, useContext } from "react";
import PostQuestionsForm from "../containers/PostQuestionForm";
import QuestionService from "../services/questions.service";
import { Question } from "../../../sharedTypes/question.type";
import { AppContext } from "../App";
import { User } from "../../../sharedTypes/user.type";
import { RouteComponentProps } from "react-router";
import QuestionButton from "../components/QuestionButton";
import Loading from "../components/Loading";

export interface PostQuestionFormValues {
    title: string;
    bodyText: string;
}

export default function PageQuestions(props: RouteComponentProps) {
    const [questions, setQuestions] = useState<Array<Question>>([]);
    const user: User = useContext(AppContext).User;

    const addQuestion = (data: PostQuestionFormValues) => {
        QuestionService.postQuestion({ ...data, userId: user._id }).then((newQuestion: Question) => {
            props.history.push("/questions/" + newQuestion._id);
        });
    };

    useEffect(() => {
        QuestionService.getAll().then((data: Array<Question>) => setQuestions(data));
    }, []);

    return (
        <div className="content-center content-section">
            <PostQuestionsForm onSubmit={(formData: PostQuestionFormValues) => addQuestion(formData)} />
            {questions.length ? (
                questions.map(qst => (
                    <QuestionButton
                        handleClick={id => props.history.push("/questions/" + id)}
                        key={qst._id}
                        id={qst._id}
                        title={qst.title}
                        upvotesCount={qst.upvotesCount}
                        createdAt={qst.createdAt}
                        createdBy={qst.createdBy}
                    />
                ))
            ) : (
                <Loading />
            )}
        </div>
    );
}
