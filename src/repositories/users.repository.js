import { db } from "../database/database.connection.js";

export async function getUrlsByUserDB( userId ) {
    return  await db.query(
                `SELECT users.id, users.name, SUM(urls."visitCount") AS "visitCount", 
                    json_agg(json_build_object('id', urls.id, 'shortUrl', urls."shortUrl", 'url', urls.url, 'visitCount', urls."visitCount")) AS "shortenedUrls"
                    FROM users JOIN urls ON users.id = urls."userId"
                    WHERE users.id = $1
                    GROUP BY users.id`, [userId]
            );
}

export async function getRankingDB() {
    return  await db.query(
                `SELECT users.id, users.name, COUNT(urls."userId") AS "linksCount", SUM(urls."visitCount") AS "visitCount" FROM users
                    LEFT JOIN urls ON users.id=urls."userId"
                    GROUP BY users.id
                    ORDER BY "visitCount" DESC
                    LIMIT 10`
            )
}