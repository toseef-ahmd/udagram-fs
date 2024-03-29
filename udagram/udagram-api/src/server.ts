import * as dotenv from "dotenv";
//import cors from 'cors';
import express from "express";
import { sequelize } from "./sequelize";
const cors = require('cors');
import { IndexRouter } from "./controllers/v0/index.router";

import bodyParser from "body-parser";
import { V0_FEED_MODELS, V0_USER_MODELS } from "./controllers/v0/model.index";

(async () => {
  dotenv.config();
  console.log("Database Connecting");
  await sequelize.addModels(V0_FEED_MODELS);
  await sequelize.addModels(V0_USER_MODELS);
  await sequelize.sync();

  console.log("Database Connected");

  const app = express();
  const port = process.env.PORT || 8080;

  app.use(bodyParser.json());

  
 // We set the CORS origin to * so that we don't need to
  //worry about the complexities of CORS. 
  const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200,
  }
  
  app.use(cors(corsOptions))

  // const corsOptions = {
  //   methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  //   allowedHeaders: ["Access-Control-Allow-Origin", "Origin", "X-Requested-With", "Content-Type", "Accept", "Authorization"],
  //   credentials: true
  // };
  
  app.options('*', cors(corsOptions));
  app.use(cors(corsOptions));

  app.use("/api/v0/", IndexRouter);

  // Root URI call
  app.get("/", async (req, res) => {
    res.send("/api/v0/");
  });

  // Start the Server
  app.listen(port, () => {
    console.log(`Backend server is listening on port number ${port}....`);
    console.log(`Frontent server running ${process.env.URL}`);
    console.log(`press CTRL+C to stop server`);
  });
})();
