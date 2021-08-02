const connection = require('./databaseConnection');
import { User } from "./entity/User";

//Build Connection
let dataList;
async function BuildConnection() {
    connection.then(connection => {
        try {
            dataList = connection.getRepository(User);
        }
        catch (error) {
            console.log("database is not connect", error);

        }
    });
}
BuildConnection();

//getMethod
var GetMethod = async function (req, res) {
    let results;
    let beforeIdData = req.url.split("id=")[1];

    if (beforeIdData) {
        let id = beforeIdData.split("&")[0];
        let phoneNumber = req.url.split("phoneNumber=")[1];
        try {
            results = await dataList.findOne({ id, phoneNumber });
            if (results) {
                res.writeHead(201, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ results }));
            }
            else {
                res.writeHead(404, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ message: "invalid id or phone number" }));

            }
        } catch (err) {
            res.writeHead(400, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: "invalid id or phone number" }));
        }
    }
    else {
        try {
            res.writeHead(201, { "Content-Type": "application/json" });
            results = await dataList.find();
            res.end(JSON.stringify({ results }));

        } catch (error) {
            res.writeHead(404, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: " not found" }));
        }
    }

}
function bodyData(req) {
    return new Promise((resolve, reject) => {
        try {
            let body = "";
            req.on("data", (chunk) => {
                body += chunk.toString();
            });
            req.on("end", () => {
                resolve(body);
            });
        } catch (error) {
            reject(error);
        }
    });
}
// to create a user
var PostMethod = async function (req, res) {
    try {
        let results;
        const data = await bodyData(req);
        const body_data = JSON.parse(`${data}`)
        const phoneNumber = body_data.results.phoneNumber;
        if (phoneNumber && phoneNumber.toString().length===10) {
            res.writeHead(201, { "Content-Type": "application/json" });
            results = await dataList.save(body_data.results);
            res.end(JSON.stringify({ results }));
            
        }
        else {
            res.writeHead(404, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: "Phone number should be 10 digit" }));

        }
    } catch (err) {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "invalid data" }));

    }  
}
//to update user data 
var PatchMethod = async function (req, res) {
    try {
    let results;
    let users;
    let idString = req.url.split("id=")[1];
    let id = idString.split("&")[0];
    let oldPhoneNumber = req.url.split("phoneNumber=")[1];
    const data = await bodyData(req);

    const body_data = JSON.parse(`${data}`)
    const phoneNumber = body_data.results.phoneNumber;
   
        users = await dataList.findOne(id, oldPhoneNumber);        
        if (users) {
            if (phoneNumber.toString().length == 10) {
                res.writeHead(404, { "Content-Type": "application/json" });
                dataList.merge(users, body_data.results);
                results = await dataList.save(users);
                return res.end(JSON.stringify({ results }));
            }
            else {
                res.writeHead(404, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ message: "phone number should be 10 digit" }));
            }
        }
        else {
            res.writeHead(404, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: "invalid  id or phone number" }));
        }
    }
    catch (err) {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "invalid  id or phone number" }));
    }
}

//to delete user data 
var DeleteMethod = async function (req, res) {
    try {
    let results;
    let idString = req.url.split("id=")[1];
    let id = idString.split("&")[0];
    let phoneNumber = req.url.split("phoneNumber=")[1];


        if (phoneNumber && id) {
            res.writeHead(400, { "Content-Type": "application/json" });
            results = await dataList.delete({ id, phoneNumber });
            if (results.affected != 0) {
                return res.end(JSON.stringify({ results }));
            }
            else {
                res.writeHead(400, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ message: "invalid  id or phone number" }));
            }
        }
        else {
            res.writeHead(400, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: "id and phone number require" }));

        }
    } catch (err) {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "invalid  id or phone number" }));    }
}
module.exports = {
    GetMethod,
    PostMethod,
    PatchMethod,
    DeleteMethod
}

