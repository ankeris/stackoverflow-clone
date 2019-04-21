import { Comment } from "../../../sharedTypes/comment.type";

const CommentService = {
    getAllForQuestion: function(question_id: string) {
        return new Promise<Array<Comment>>((res, rej) => {
            fetch(`http://localhost:3001/api/questions/${question_id}/comments`)
            .then(function(data) {
                const finalData= data.json();
                res(finalData);
            }).catch((err: Error) => rej(err))
        })
    },
    postComment: function(question_id: string, user_id: any, bodyText) {
        return new Promise<Array<Comment>>((res, rej) => {
            fetch(`http://localhost:3001/api//questions/${question_id}/user/${user_id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    body: bodyText
                })
            })
            .then(response => res(response.json()))
        })
    }
};

export default CommentService;