import { Router } from "express";
import { validateSchema } from "../middlewares/validateSchema.middleware.js";
import { deleteUrl, getUrlById, postShortUrl, redirectUrl } from "../controllers/urls.controller.js";
import { urlSchema } from "../schemas/urls.schemas.js";
import { authValidation } from "../middlewares/authValidation.middleware.js";
import { deleteUrlValidation, searchShortUrlValidation, searchUrlByIdValidation } from "../middlewares/urls.middleware.js";


const urlRouter = Router();

urlRouter.post('/urls/shorten', authValidation, validateSchema(urlSchema), searchUrlByIdValidation, postShortUrl);
urlRouter.get('/urls/:id', getUrlById);
urlRouter.get('/urls/open/:shortUrl', searchShortUrlValidation, redirectUrl);
urlRouter.delete('/urls/:id', authValidation, deleteUrlValidation, deleteUrl);

export default urlRouter;