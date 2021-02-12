const bcryptjs = require("bcryptjs");

const connection = require("../DBConnection");
const poolConnection = connection.poolConnection;

class User {
  fill(data) {
    this.login = data.login;
    this.email = data.email;

    if (this.password === undefined) {
      const salt = bcryptjs.genSaltSync(12);
      this.password = bcryptjs.hashSync(data.password, salt);
    }
  }

  async save() {
    let foundUser = await User.findByLogin(this.login);

    if (foundUser) {
      try {
        let [
          result,
          fields,
        ] = await poolConnection.execute(
          "UPDATE users SET `login`=?, `password`=?, `email`=? where `login`=?",
          [this.login, this.password, this.email, this.login]
        );
      } catch (error) {
        console.log(error.message);
        return false;
      }
    } else {
      try {
        let [
          result,
          fields,
        ] = await poolConnection.execute(
          "INSERT INTO users (login, password, email) VALUES (?, ?, ?)",
          [this.login, this.password, this.email]
        );
      } catch (error) {
        console.log(error.message);
        return false;
      }
    }

    return true;
  }

  static async findByLogin(login) {
    let [
      result,
      fields,
    ] = await poolConnection.execute(
      "SELECT id, login, password, email FROM users WHERE login = ? LIMIT 1",
      [login]
    );

    if (!result || result.length === 0) {
      return undefined;
    }

    let user = new User();
    user.password = result[0].password;
    user.fill(result[0]);
    return user;
  }

  checkPassword(password) {
    return bcryptjs.compareSync(password, this.password);
  }

  static async findOrCreateGoogle(profile) {
    let user = await this.findByLogin(profile.id);

    if (!user) {
      let user = new User();
      let data = { login: profile.id, password: profile.id, email: "" };

      user.fill(data);
      user.save();
    }

    return user;
  }
}

module.exports = User;
