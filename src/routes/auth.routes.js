import { Router } from "express";
import { validateSchema } from "../middlewares/validateSchema.middleware.js";
import { signup, signin } from "../controllers/auth.controller.js";
import { signinSchema, signupSchema } from "../schemas/auth.schemas.js";
import { signinValidation, signupValidation } from "../middlewares/auth.middleware.js";

const authRouter = Router();

authRouter.post('/signup', validateSchema(signupSchema), signupValidation, signup);
authRouter.post('/signin', validateSchema(signinSchema), signinValidation, signin);

export default authRouter;