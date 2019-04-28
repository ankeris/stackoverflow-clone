import { Comment } from "../../../sharedTypes/comment.type";
import { addTokenHeader } from "./users.service";

const CommentService = {
    getAllForQuestion: function(question_id: string) {
        return new Promise<Array<Comment>>((res, rej) => {
            fetch(`${process.env.REACT_APP_API_URL}/questions/${question_id}/comments`, { headers: addTokenHeader() })
                .then(function(data) {
                    const finalData = data.json();
                    res(finalData);
                })
                .catch((err: Error) => rej(err));
        });
    },
    postComment: function(question_id: string, user_id: any, bodyText) {
        return new Promise<Array<Comment>>((res, rej) => {
            fetch(`${process.env.REACT_APP_API_URL}/questions/${question_id}/user/${user_id}`, {
                method: "POST",
                headers: addTokenHeader(),
                body: JSON.stringify({
                    body: bodyText
                })
            }).then(response => res(response.json()));
        });
    }
};

export default CommentService;
