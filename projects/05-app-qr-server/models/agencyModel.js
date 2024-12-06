import db from "../config/dbMySql.js";
import BaseModel from "./baseModel.js";

class Agency extends BaseModel {
  static tableName = 'agencies';
}

export default Agency;
