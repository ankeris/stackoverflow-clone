"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
}
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv = __importStar(require("dotenv"));
var mongoose_1 = __importDefault(require("mongoose"));
var express_1 = __importDefault(require("express"));
var express_router_1 = __importDefault(require("./express.router"));
var body_parser_1 = __importDefault(require("body-parser"));
var path_1 = __importDefault(require("path"));
// Dotenv initialize
dotenv.config();
// Express initialize & settings
var app = express_1.default();
app.use(express_1.default.static(path_1.default.resolve(__dirname, "../../../../client/build")));
// Passport config
var expressRoutes = new express_router_1.default(app);
app.use(body_parser_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Authorization, Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, PATCH, POST, OPTIONS, PUT, DELETE");
    next();
});
expressRoutes.init();
app.get("/", function (req, res) {
    res.sendFile(path_1.default.join(__dirname, "../../../../client/build", "index.html"));
});
// DB Connection
mongoose_1.default
    .connect(process.env.MONGO_URI || "localhost:27017/test", { useNewUrlParser: true })
    .then(function () { return console.log("MongoDB connected"); })
    .catch(function (err) { return console.log(err); });
app.listen(process.env.PORT || 5000, function () {
    console.log("Express server app listening on port " + process.env.PORT + "!");
});
