import { Router } from "express";
import { getUrlsByUser, ranking } from "../controllers/users.controller.js";
import { authValidation } from "../middlewares/authValidation.middleware.js";


const usersRouter = Router();

usersRouter.get('/users/me', authValidation, getUrlsByUser);
usersRouter.get('/ranking', ranking);

export default usersRouter;