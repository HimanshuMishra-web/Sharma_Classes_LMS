require("dotenv").config();
const  {server}  = require("./app");

const requireDir = require("require-dir");

const PORT = process.env.PORT ||  6560;
const HOST = process.env.HOST || "localhost";

requireDir("./controllers");
requireDir("./controllers/create");
requireDir("./controllers/update");
requireDir("./controllers/retrieve");
requireDir("./controllers/delete");
requireDir("./controllers/whatsApp");
requireDir("./controllers/auth");
requireDir("./routes");

server.listen(PORT, HOST,() => {
  console.log(`listening on ${PORT} ${HOST}`);
});