import { db } from "../database/database.connection.js";

export async function validateUserByEmailDB( email ) {
    return await db.query(`SELECT * FROM users WHERE email=$1;`, [email]);
}

export async function signupDB( name, email, hash ) {
    return  await db.query(
                `INSERT INTO users (name, email, password) VALUES ($1, $2, $3);`, [name, email, hash]
            );
}

export async function signinDB( userId, token ) {
    return  await db.query(
                `INSERT INTO sessions ("userId", token) VALUES ($1, $2)`, [userId, token]
            );
}

export async function authValidationDB( token ) {
    return  await db.query(
                `SELECT "userId" FROM sessions WHERE token = $1`, [token]
            );
}