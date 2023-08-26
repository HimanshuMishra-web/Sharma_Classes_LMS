const {Router} = require("express");
const apiRouter = require("./apiRouter");

const authRouter = Router();

apiRouter.use("/auth", authRouter);

module.exports = authRouter;
