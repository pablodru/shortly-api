import { db } from "../database/database.connection.js";

export async function getUrlsByUser (req, res) {
    const { userId } = res.locals;
    try {

        const result = await db.query(
            `SELECT urls."userId", users.name, SUM(urls."visitCount") AS "visitCount"`
        )

    } catch (err) {
        res.status(500).send(err.message);
    }
}

export async function ranking (req, res) {
    try {

    } catch (err) {
        res.status(500).send(err.message);
    }
}