import { NextFunction, Request, Response, Router } from "express";
import { User } from "../models-mongo/User";
import { User as UserType } from "../../../sharedTypes/user.type";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export function getOne(req: Request, res: Response, next: NextFunction): void {
    res.setHeader("Content-Type", "application/json");
    User.findOne({
        _id: req.params.id
    })
        .then(result => {
            if (result) {
                res.send(result);
            } else {
                res.json("No document matches the provided query.");
            }
            return result;
        })
        .catch(err => console.error(`Failed to find document: ${err}`));
}

export function login(req: Request, res: Response, next: NextFunction): void {
    User.findOne({
        name: req.body.name
    })
        .lean()
        .then((user: UserType | any) => {
            if (!user) {
                res.status(500).json("Username or password incorrect");
            } else {
                // Check submitted password
                const submittedPassword = req.body.password;
                bcrypt.compare(submittedPassword, user.password, (err, isMatch) => {
                    if (err) throw err;
                    if (!isMatch) {
                        res.status(500).json("Username or password incorrect");
                    }
                    // Remove password from token since we don't need it
                    delete user.password;
                    jwt.sign({ user }, <string>process.env.JWT_SECRET, { expiresIn: "7 days" }, (err: Error, token: string) => {
                        res.status(200).json(token);
                    });
                });
            }
        });
}

export function createUser(req: Request, res: Response): void {
    res.setHeader("Content-Type", "application/json");
    User.findOne({ name: req.body.name }, (err, user) => {
        if (user) {
            res.status(500).json("Account with this name already exists");
        } else {
            const regex = RegExp("^[A-z0-9_-]{3,25}$");
            const validName = regex.test(req.body.name);
            const validPassword = regex.test(req.body.password);

            if (validName && validPassword) {
                const newItem: any = new User(<UserType>{
                    name: req.body.name,
                    password: req.body.password
                });
                bcrypt.genSalt(10, (err: Error, salt: string) => {
                    if (err) throw err;
                    bcrypt.hash(newItem.password, salt, (err: Error, hash: string) => {
                        if (err) throw err;
                        // Hash the password
                        newItem.password = hash;
                        newItem
                            .save()
                            .then((item: any) => res.json({ item }))
                            .catch((err: Error) => console.error(err));
                    });
                });
            } else {
                res.status(500).json("Please choose valid username or password");
            }
        }
    });
}
interface IRequest extends Request {
    token?: string;
}
export const ensureAuth = (req: IRequest, res: Response, next: NextFunction) => {
    // get value from authorization header
    const bearerHeader = req.headers["authorization"];

    if (typeof bearerHeader !== "undefined") {
        // Verify the token
        const bearer = (<string>bearerHeader).split(" ")[1];
        jwt.verify(<string>bearer, <string>process.env.JWT_SECRET, (err, authData) => {
            // Throw err status if unauthorized
            if (err) res.sendStatus(403);
            else {
                // Allow access the route if everything is fine
                next();
            }
        });
    } else {
        // Forbidden
        res.sendStatus(403);
    }
};
