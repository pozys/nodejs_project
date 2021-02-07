const mysql = require("mysql2");
const config = require("./config");

const simpleConnection = () => {
  return mysql.createConnection({
    host: config.host,
    user: config.user,
    database: config.database,
    password: config.password,
  });
};

const connectionWithoutDB = () => {
  return mysql.createConnection({
    host: config.host,
    user: config.user,
    password: config.password,
  });
};

const poolConnection = () => {
  return mysql.createPool({
    connectionLimit: 10,
    host: config.host,
    user: config.user,
    password: config.password,
    database: config.database,
  });
};

const connection = {
  simpleConnection: simpleConnection,
  connectionWithoutDB: connectionWithoutDB,
  poolConnection: poolConnection,
};

module.exports = connection;
