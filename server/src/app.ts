import * as dotenv from "dotenv";
import mongoose from "mongoose";
import express from "express";
import ExpressRotuer from "./express.router";
import bodyParser from "body-parser";
import path from "path";
// Dotenv initialize
dotenv.config();

// Express initialize & settings
const app = express();

app.use(express.static(path.resolve(__dirname, "../../../../client/build")));

// Passport config
const expressRoutes = new ExpressRotuer(app);
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Authorization, Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, PATCH, POST, OPTIONS, PUT, DELETE");
    next();
});

expressRoutes.init();

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../../../../client/build", "index.html"));
});
// DB Connection
mongoose
    .connect(process.env.MONGO_URI || "localhost:27017/test", { useNewUrlParser: true })
    .then(() => console.log("MongoDB connected"))
    .catch((err: Error) => console.log(err));

app.listen(process.env.PORT || 5000, () => {
    console.log(`Express server app listening on port ${process.env.PORT}!`);
});

export interface IRequest extends Request {
    token?: string;
}
