import { db } from "../database/database.connection.js";
import bcrypt from 'bcrypt';

export async function signupValidation(req, res, next) {
    const { name, email, password, confirmPassword } = req.body;
    try {

        //422 EM CASO DE SENHAS DIFERENTES
        if ( password !== confirmPassword ) return res.sendStatus(422);

        //409 EMAIL JÁ CADASTRADO
        const existingEmail = await db.query(`SELECT * FROM users WHERE email=$1;`, [email]);
        if ( existingEmail.rowCount > 0 ) return res.sendStatus(409);

        next();

    } catch (err) {
        res.status(500).send(err.message)
    }
}

export async function signinValidation(req, res, next) {
    const { email, password } = req.body;
    try {

        //401 EM CASO DE EMAIL E SENHA NÃO BATEREM
        const existingUser = await db.query(
            `SELECT id, password FROM users WHERE email=$1`, [email]
        );
        if ( existingUser.rowCount === 0 ) return res.sendStatus(401);

        const correctPassword = bcrypt.compareSync(password, existingUser.rows[0].password);
        if ( !correctPassword ) return res.sendStatus(401);

        res.locals.userId = existingUser.rows[0].id; 

        next();

    } catch (err) {
        res.status(500).send(err.message)
    }
}