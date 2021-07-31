import * as express from "express";

const app = express();
app.use(express.json());
const methodRouter = require('./methodRouter.route');

// register routes
app.use('/', methodRouter);

//port
app.listen(3000);
