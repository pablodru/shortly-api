import { db } from "../database/database.connection.js";
import { getRankingDB, getUrlsByUserDB } from "../repositories/users.repository.js";

export async function getUrlsByUser (req, res) {
    const { userId } = res.locals;
    try {

        const result = getUrlsByUserDB(userId);

        res.status(200).send(result.rows[0]);

    } catch (err) {
        res.status(500).send(err.message);
    }
}

export async function ranking (req, res) {
    try {

        const result = getRankingDB();

        res.send(result.rows)

    } catch (err) {
        res.status(500).send(err.message);
    }
}