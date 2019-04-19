import { Question } from "../../../sharedTypes/question.type";

const QuestionService = {
    getAll: function() {
        return new Promise<Array<Question>>((res, rej) => {
            fetch('http://localhost:3001/api/questions')
            .then(function(data) {
                const finalData= data.json();
                res(finalData);
            }).catch((err: Error) => rej(err))
        })
    },

    getOne: function(id: string) {
        return new Promise<Array<Question>>((res, rej) => {
            fetch('http://localhost:3001/api/questions/' + id)
            .then(function(data) {
                const finalData = data.json();
                res(finalData);
            }).catch((err: Error) => rej(err))
        })
    },
    
    postQuestion: function({title, bodyText, userId}) {
        return new Promise((res, rej) => {
            fetch(`http://localhost:3001/api/questions/user/${userId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title: title,
                    body: bodyText,
                    createdBy: userId
                }),
            })
            .then(response => res(response.json()))
        })
    }
};

export default QuestionService;