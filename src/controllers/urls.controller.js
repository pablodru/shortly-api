import { nanoid } from "nanoid";
import { db } from "../database/database.connection.js";

export async function postShortUrl (req, res) {
    const { url } = req.body;
    try {

        const shortUrl = nanoid(8);
        const result = await db.query(
            `INSERT INTO urls ("userId", url, "shortUrl") VALUES ($1, $2, $3) RETURNING id, "shortUrl"`, [res.locals.userId, url, shortUrl]
        );

        res.status(201).send(result.rows[0]);

    } catch (err) {
        res.status(500).send(err.message);
    }
}

export async function getUrlById (req, res) {
    const { id } = req.params;
    try {

        const url = await db.query(
            `SELECT id, "shortUrl", url FROM urls WHERE id=$1`, [id]
        );

        if ( url.rowCount === 0 ) return res.sendStatus(404);

        res.status(200).send(url.rows[0]);

    } catch (err) {
        res.status(500).send(err.code);
    }
}

export async function redirectUrl (req, res) {
    const { shortUrl } = req.params;
    try {

        const result = await db.query(
            `UPDATE urls SET "visitCount"="visitCount" + 1 WHERE "shortUrl"=$1 RETURNING url`, [shortUrl]
        );
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

        const existingUrl = await db.query(
            `SELECT "userId" FROM urls WHERE id=$1;`, [id]
        );
        if ( existingUrl.rowCount === 0 ) return res.sendStatus(404);

        if ( existingUrl.rows[0].userId !== res.locals.userId ) return res.sendStatus(401);

        await db.query(
            `DELETE FROM urls WHERE id=$1;`, [id]
        );

        res.sendStatus(204);

    } catch (err) {
        res.status(500).send(err.message);
    }
}