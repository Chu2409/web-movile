import BaseModel from "./baseModel.js";

class Task extends BaseModel {
  static tableName = 'tasks';
}

export default Task;
