var http = require('http');
const url = require('url');
const dotenv = require('dotenv');
const path = require('path');
const Joi = require('joi');

dotenv.config({ path: path.join(__dirname, '../.env') });
const envVarsSchema = Joi.object();
const { value: envVars } = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(process.env);
const {
    PostMethod,
    GetMethod,
    DeleteMethod,
    PatchMethod
} = require('./controller');
const server = http.createServer(async (req, res) => {
    if (req.url.match(/\/user?/) && req.method === "GET") {
        GetMethod(req, res)
    }
    else if (req.url === "/user" && req.method === "GET") {
        GetMethod(req, res)
    }
    else if (req.url === "/user" && req.method === "POST") {
        PostMethod(req, res)
    }
    else if(req.url.match(/\/user?/) && req.method === "PATCH") {
        PatchMethod(req, res)
    }
    else if(req.url.match(/\/user?/) && req.method === "DELETE") {
        DeleteMethod(req, res)
    }
})
server.listen(envVars.PORT, () => {
    console.log(`server started on port: 3000`);
});
