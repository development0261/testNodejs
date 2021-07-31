const connection = require('./db');
import { Request, Response } from "express";
import { User } from "./entity/User";

//startConnection function is for find connection with data base and excess with userRepository to change database
let userRepository;
async function startConnection() {
    connection.then(connection => {
        try {
            userRepository = connection.getRepository(User);
        }
        catch (error) {
            console.log("database is not connect", error);

        }
    });
}
startConnection();
//to get data
// - fetch a user matching the query
// - if no query params are specified, return all
var GetData = async function (req: Request, res: Response) {

    const { id } = req.query
    const { phoneNumber } = req.query

    let results;
    try {
        if (id && phoneNumber) {
            results = await userRepository.findOne({ id, phoneNumber });
            if (results) {
                return res.status(201).send(results);
            }
            else {
                return res.status(400).send('invalid id or phone number');
            }
        }
        else {
            results = await userRepository.find();
            return res.status(201).send(results);
        }
    } catch (err) {
        return res.status(400).send('invalid id or phone number');
    }
}

// to create a user
var PostData = async function (req: Request, res: Response) {
    let user;
    let results;
    const { phoneNumber } = req.body

    try {
        if (phoneNumber && phoneNumber.length == 10) {
            user = await userRepository.create(req.body);
            results = await userRepository.save(user);
        }
        else {
            return res.status(400).send('Phone number should be 10 digit');

        }
    } catch (err) {
        return res.status(400).send('invalid data');

    }
    return res.send(results);
}
//to update user data 
var PatchData = async function (req: Request, res: Response) {
    let results;
    let users;
    const { id } = req.query
    const { phoneNumber } = req.body
    const data = req.query.phoneNumber

    try {
        users = await userRepository.findOne(id, data);
        if (users) {
            if (phoneNumber.length == 10) {
                userRepository.merge(users, req.body);
                results = await userRepository.save(users);
            }
            else {
                return res.status(400).send('phone number should be 10 digit');
            }
        }
        else {
            return res.status(400).send('invalid  id or phone number');
        }
    }
    catch (err) {
        return res.status(400).send('invalid id or phone number');
    }
    return res.send(results);
}

//to delete user data 
var DeleteData = async function (req: Request, res: Response) {
    let results;
    const { phoneNumber } = req.query
    const { id } = req.query

    try {
        if (phoneNumber && id) {
            results = await userRepository.delete({ id, phoneNumber });
            if (results.affected != 0) {
                return res.send(results);
            }
            else {
                return res.status(400).send('invalid id or phone number');
            }
        }
        else {
            return res.status(400).send('id and phone number require');

        }
    } catch (err) {
        return res.status(400).send('invalid id and phone number');
    }
}
module.exports = {
    GetData,
    PostData,
    PatchData,
    DeleteData
}