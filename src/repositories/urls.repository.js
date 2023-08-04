import { db } from "../database/database.connection.js";

export async function insertUrlDB( userId, url, shortUrl ) {
    return  await db.query(
                `INSERT INTO urls ("userId", url, "shortUrl") VALUES ($1, $2, $3) RETURNING id, "shortUrl"`, [userId, url, shortUrl]
            );
}

export async function getUrlByIdDB( id ) {
    return  await db.query(
                `SELECT id, "shortUrl", url FROM urls WHERE id=$1`, [id]
            );
}

export async function redirectUrlDB( shortUrl ) {
    return  await db.query(
                `UPDATE urls SET "visitCount"="visitCount" + 1 WHERE "shortUrl"=$1 RETURNING url`, [shortUrl]
            );
}

export async function getUserIdByIdDB( id ) {
    return  await db.query(
                `SELECT "userId" FROM urls WHERE id=$1;`, [id]
            );
}

export async function deleteUrlDB( id ) {
    return  await db.query(
                `DELETE FROM urls WHERE id=$1;`, [id]
            );
}