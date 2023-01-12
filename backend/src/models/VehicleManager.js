const AbstractManager = require("./AbstractManager");

class VehicleManager extends AbstractManager {
  constructor() {
    super({ table: "vehicle" });
  }

  insert(vehicle) {
    return this.connection.query(
      `insert into ${this.table} (title) values (?)`,
      [vehicle.title]
    );
  }

  update(vehicle) {
    return this.connection.query(
      `update ${this.table} set title = ? where id = ?`,
      [vehicle.title, vehicle.id]
    );
  }
}

module.exports = VehicleManager;
