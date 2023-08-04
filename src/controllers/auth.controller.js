import { db } from "../database/database.connection.js";
import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';

export async function signup (req, res) {
    const { name, email, password, confirmPassword } = req.body;
    try {

        const hash = bcrypt.hashSync(password, 10);

        await db.query(
            `INSERT INTO users (name, email, password) VALUES ($1, $2, $3);`, [name, email, hash]
        );

        res.sendStatus(201);

    } catch (err) {
        res.status(500).send(err.message);
    }
}

export async function signin (req, res) {
    try {

        const token = uuid();
        await db.query(
            `INSERT INTO sessions ("userId", token) VALUES ($1, $2)`, [res.locals.userId, token]
        );

        res.status(200).send({ token });

    } catch (err) {
        res.status(500).send(err.message);
    }
}