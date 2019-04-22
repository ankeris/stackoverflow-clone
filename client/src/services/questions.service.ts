import { Question } from "../../../sharedTypes/question.type";
import { addTokenHeader } from "./users.service";

const QuestionService = {
    getAll: function() {
        return new Promise<Array<Question>>((res, rej) => {
            fetch(`${process.env.REACT_APP_API_URL}/questions`, { headers: addTokenHeader() })
                .then(function(data) {
                    const finalData = data.json();
                    res(finalData);
                })
                .catch((err: Error) => rej(err));
        });
    },

    getOne: function(id: string) {
        return new Promise<Question>((res, rej) => {
            fetch(`${process.env.REACT_APP_API_URL}/questions/${id}`, { headers: addTokenHeader() })
                .then(function(data) {
                    const finalData = data.json();
                    res(finalData);
                })
                .catch((err: Error) => rej(err));
        });
    },

    postQuestion: function({ title, bodyText, userId }) {
        return new Promise<Question>((res, rej) => {
            fetch(`${process.env.REACT_APP_API_URL}/questions/user/${userId}`, {
                method: "POST",
                headers: addTokenHeader(),
                body: JSON.stringify({
                    title: title,
                    body: bodyText,
                    createdBy: userId
                })
            }).then(response => res(response.json()));
        });
    },
    upvoteQuestion: (questionId, userId) => {
        return new Promise((res, rej) => {
            fetch(`${process.env.REACT_APP_API_URL}/questions/upvote/${questionId}/user/${userId}`, {
                method: "PATCH",
                headers: addTokenHeader()
            }).then(response => res(response.json()));
        });
    }
};

export default QuestionService;
