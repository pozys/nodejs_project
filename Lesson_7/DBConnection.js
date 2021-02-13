const mysql = require("mysql2");
const config = require("./config");

const simpleConnection = () => {
  return mysql.createConnection({
    host: config.mysql.host,
    user: config.mysql.user,
    database: config.mysql.database,
    password: config.mysql.password,
  });
};

const connectionWithoutDB = () => {
  return mysql.createConnection({
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
  });
};

const poolConnection = () => {
  return mysql.createPool({
    connectionLimit: 10,
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database,
  });
};

const connection = {
  simpleConnection: simpleConnection,
  connectionWithoutDB: connectionWithoutDB,
  poolConnection: poolConnection().promise(),
};

module.exports = connection;
