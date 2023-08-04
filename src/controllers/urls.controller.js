import { nanoid } from "nanoid";
import { db } from "../database/database.connection.js";

export async function postShortUrl (req, res) {
    const { url } = req.body;
    try {

        const shortUrl = nanoid(8);
        await db.query(
            `INSERT INTO urls ("userId", url, "shortUrl") VALUES ($1, $2, $3)`, [res.locals.userId, url, shortUrl]
        );

        res.sendStatus(201);

    } catch (err) {
        res.status(500).send(err.message);
    }
}

export async function getUrlById (req, res) {
    try {

    } catch (err) {
        res.status(500).send(err.message);
    }
}

export async function redirectUrl (req, res) {
    try {

    } catch (err) {
        res.status(500).send(err.message);
    }
}

export async function deleteUrl (req, res) {
    try {

    } catch (err) {
        res.status(500).send(err.message);
    }
}