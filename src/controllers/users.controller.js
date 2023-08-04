import { db } from "../database/database.connection.js";

export async function getUrlsByUser (req, res) {
    const { userId } = res.locals;
    try {

        const result = await db.query(
            `SELECT users.id, users.name, SUM(urls."visitCount") AS "visitCount", 
                json_agg(json_build_object('id', urls.id, 'shortUrl', urls."shortUrl", 'url', urls.url, 'visitCount', urls."visitCount")) AS "shortenedUrls"
                FROM users JOIN urls ON users.id = urls."userId"
                WHERE users.id = $1
                GROUP BY users.id`, [userId]
        );

        res.status(200).send(result.rows[0]);

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