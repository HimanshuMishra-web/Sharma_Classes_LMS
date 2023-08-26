const {Router} = require("express");
const apiRouter = require("./apiRouter");

const whatsAppRouter = Router();

apiRouter.use("/whatsApp", whatsAppRouter);
module.exports = whatsAppRouter;