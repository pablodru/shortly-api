import { db } from "../database/database.connection.js";
import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
import { signinDB, signupDB } from "../repositories/auth.repository.js";

export async function signup (req, res) {
    const { name, email, password, confirmPassword } = req.body;
    try {

        const hash = bcrypt.hashSync(password, 10);

        signupDB(name, email, hash);

        res.sendStatus(201);

    } catch (err) {
        res.status(500).send(err.message);
    }
}

export async function signin (req, res) {
    try {

        const token = uuid();
        signinDB(res.locals.userId, token);

        res.status(200).send({ token });

    } catch (err) {
        res.status(500).send(err.message);
    }
}