const { create } = require("handlebars");

const Task = {
  connection: null,
  async index() {
    let [tasks, fields] = await this.connection.query(
      "SELECT id, name, description, priority FROM tasks"
    );

    return tasks;
  },
  async store(task) {
    let data = [task.name, task.description, task.priority];
    let [result, fields] = await this.connection.execute(
      "INSERT INTO tasks (name, description, priority) VALUES(?, ?, ?)",
      data
    );

    return result;
  },
  async findOne(id) {
    let [
      task,
      fields,
    ] = await this.connection.query(
      "SELECT id, name, description, priority FROM tasks WHERE id = ? LIMIT 1",
      [id]
    );

    return task[0];
  },
  async update(task) {
    let data = [task.name, task.description, task.priority, task.id];
    let [result, fields] = await this.connection.query(
      "UPDATE tasks SET `name`=?, `description`=?, `priority`=? where `id`=?",
      data
    );

    return result;
  },
  async destroy(id) {
    let [
      result,
      fields,
    ] = await this.connection.query("DELETE FROM tasks where `id`=?", [id]);

    return result;
  },
};

module.exports = Task;
