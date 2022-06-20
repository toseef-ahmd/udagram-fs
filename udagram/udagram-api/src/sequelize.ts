import { Sequelize } from "sequelize-typescript";
import { config } from "./config/config";

console.log(config.host)
console.log(config.database)
console.log(config.username)
console.log(config.password)

export const sequelize = new Sequelize({
  username: config.username,
  password: config.password,
  database: config.database,
  host: config.host,
  
  dialect: "postgres",
  storage: ":memory:",
});
