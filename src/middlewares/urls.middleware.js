import { db } from "../database/database.connection.js";

export async function deleteUrlValidation(req, res, next) {
    try {

        //401 QUANDO A URL NÃO PERTENCER AO USUÁRIO
        //404 EM CASO DE NÃO EXISTIR URL ENCURTADA

        next();

    } catch (err) {
        res.status(500).send(err.message)
    }
}