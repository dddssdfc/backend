const dotenv = require("dotenv");
dotenv.config();
const apiKey = process.env.DATABASE;

module.exports = {
  database: `${apiKey}`,
  //database: "mongodb://localhost:27017/bin_it",
};
