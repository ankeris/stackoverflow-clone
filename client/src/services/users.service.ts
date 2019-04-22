import { User } from "../../../sharedTypes/user.type";

type RegisterFeedback = {
    status: number;
    message: any;
};

export const addTokenHeader = () => {
    return new Headers({
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json"
    });
};

const UsertService = {
    registerUser: function({ username, password }) {
        return new Promise<RegisterFeedback>((resolve, reject) => {
            fetch(`${process.env.REACT_APP_API_URL}/users/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: username,
                    password: password
                })
            }).then((data: Response) => {
                resolve({
                    status: data.status,
                    message: data.json()
                });
            });
        });
    },
    login: ({ username, password }) => {
        return new Promise<any>((resolve, reject) => {
            fetch(`${process.env.REACT_APP_API_URL}/users/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: username,
                    password: password
                })
            }).then((data: Response) => {
                if (data.status !== 500) {
                    resolve(data.json());
                } else {
                    reject("bad rq");
                }
            });
        });
    }
};

export default UsertService;
