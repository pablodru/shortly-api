import { nanoid } from "nanoid";
import { db } from "../database/database.connection.js";
import { deleteUrlDB, getUrlByIdDB, getUserIdByIdDB, insertUrlDB, redirectUrlDB } from "../repositories/urls.repository.js";

export async function postShortUrl (req, res) {
    const { url } = req.body;
    try {

        const shortUrl = nanoid(8);
        const result = await insertUrlDB(res.locals.userId, url, shortUrl);

        res.status(201).send(result.rows[0]);

    } catch (err) {
        res.status(500).send(err.message);
    }
}

export async function getUrlById (req, res) {
    const { id } = req.params;
    try {

        const url = await getUrlByIdDB(id);

        if ( url.rowCount === 0 ) return res.sendStatus(404);

        res.status(200).send(url.rows[0]);

    } catch (err) {
        res.status(500).send(err.code);
    }
}

export async function redirectUrl (req, res) {
    const { shortUrl } = req.params;
    try {

        const result = await redirectUrlDB(shortUrl);
        console.log(result)
        if ( result.rowCount === 0 ) return res.sendStatus(404);

        res.redirect(result.rows[0].url);

    } catch (err) {
        res.status(500).send(err.message);
    }
}

export async function deleteUrl (req, res) {
    const { id } = req.params;
    try {

        const existingUrl = await getUserIdByIdDB(id);
        if ( existingUrl.rowCount === 0 ) return res.sendStatus(404);

        if ( existingUrl.rows[0].userId !== res.locals.userId ) return res.sendStatus(401);

        await deleteUrlDB(id);

        res.sendStatus(204);

    } catch (err) {
        res.status(500).send(err.message);
    }
}