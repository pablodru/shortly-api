import { db } from "../database/database.connection.js";

export async function signupValidation(req, res, next) {
    try {

        //422 EM CASO DE SENHAS DIFERENTES
        //409 EMAIL JÁ CADASTRADO

        next();

    } catch (err) {
        res.status(500).send(err.message)
    }
}

export async function signinValidation(req, res, next) {
    try {

        //401 EM CASO DE EMAIL E SENHA NÃO BATEREM

        next();

    } catch (err) {
        res.status(500).send(err.message)
    }
}