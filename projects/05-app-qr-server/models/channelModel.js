import db from "../config/dbMySql.js";
import BaseModel from "./baseModel.js";

class Channel extends BaseModel {
  static tableName = 'channels';
}

export default Channel;
