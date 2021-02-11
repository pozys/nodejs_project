const connection = require("../DBConnection");
const poolConnection = connection.poolConnection;

class Task {
  static async index() {
    let [tasks, fields] = await poolConnection.query(
      "SELECT id, name, description, priority FROM tasks"
    );

    return tasks;
  }
  static async store(task) {
    let data = [task.name, task.description, task.priority];
    let [result, fields] = await poolConnection.execute(
      "INSERT INTO tasks (name, description, priority) VALUES(?, ?, ?)",
      data
    );

    return result;
  }
  static async findOne(id) {
    let [
      task,
      fields,
    ] = await poolConnection.query(
      "SELECT id, name, description, priority FROM tasks WHERE id = ? LIMIT 1",
      [id]
    );

    return task[0];
  }
  static async update(task) {
    let data = [task.name, task.description, task.priority, task.id];
    let [result, fields] = await poolConnection.query(
      "UPDATE tasks SET `name`=?, `description`=?, `priority`=? where `id`=?",
      data
    );

    return result;
  }
  static async destroy(id) {
    let [
      result,
      fields,
    ] = await poolConnection.query("DELETE FROM tasks where `id`=?", [id]);

    return result;
  }
}

module.exports = Task;
