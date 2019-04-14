import * as dotenv from 'dotenv';
import mongoose from 'mongoose';
import express from 'express';
import ExpressRotuer from './express.router';
import bodyParser = require('body-parser');

// Dotenv initialize
dotenv.config();

// Express initialize & settings
const app = express();
const expressRoutes = new ExpressRotuer(app);
app.use(bodyParser.json())
expressRoutes.init();

// DB Connection
mongoose.connect(process.env.MONGO_URI || 'localhost:27017/test', { useNewUrlParser: true })
.then(() => console.log('MongoDB connected'))
.catch((err: Error) => console.log(err));

app.listen(process.env.PORT, () => {
  console.log(`Express server app listening on port ${process.env.PORT}!`);
});
