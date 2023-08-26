// const  firebase  = require("../controllers/app/firebaseConfig");
const {Router} = require("express");
const apiRouter = require("./apiRouter");

const firebaseRouter = Router();

apiRouter.use("/OTP", firebaseRouter);

module.exports = firebaseRouter;
