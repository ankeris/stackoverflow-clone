import { Question } from "../../../sharedTypes/question.type";

const ValidationService = {
    getAll: function() {
        return new Promise<Array<Question>>((res, rej) => {
            fetch('http://localhost:3001/api/questions')
            .then(function(data) {
                const finalData= data.json();
                res(finalData);
            })
        })
    },

    getOne: function(value) {
        //inspect the value
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

export default ValidationService;