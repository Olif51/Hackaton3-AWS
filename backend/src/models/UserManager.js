const AbstractManager = require("./AbstractManager");

class UserManager extends AbstractManager {
  constructor() {
    super({ table: "user" });
  }

  insert(user) {
    return this.connection.query(
      `insert into ${this.table} firstname, lastname, email, hashedPassword values (?, ?, ?, ?)`,
      [user.firstname, user.lastname, user.email, user.hashedPassword]
    );
  }

  update(user) {
    return this.connection.query(
      `update ${this.table} set firstname = ?, lastname = ?, email = ?, hashedPassword = ? where id = ?`,
      [user.firstname, user.lastname, user.email, user.hashedPassword, user.id]
    );
  }
}

module.exports = UserManager;
