const connection = require("./DBConnection");
const connectionWithoutDB = connection.connectionWithoutDB().promise();

(async () => {
  try {
    [result, fields] = await connectionWithoutDB.execute(
      `CREATE DATABASE IF NOT EXISTS HW5 CHARACTER SET utf8 COLLATE utf8_unicode_ci;`
    );
    console.log(result);

    [result, fields] = await connectionWithoutDB.execute(
      `CREATE TABLE IF NOT EXISTS HW5.tasks(
        id int unsigned primary key auto_increment,
        name varchar(500) not null,
        description text,
        priority enum("Высокий", "Средний", "Низкий") not null default "Средний"
      );`
    );
    console.log(result);

    [result, fields] = await connectionWithoutDB.execute(
      `CREATE TABLE IF NOT EXISTS HW5.users(
        id int unsigned primary key auto_increment,
        login varchar(150) not null,
        password varchar(250) not null,
        email varchar(250)
      );`
    );
    console.log(result);
  } catch (err) {
    console.error(err);
  } finally {
    connectionWithoutDB.end();
  }
})();
