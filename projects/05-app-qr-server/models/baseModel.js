import db from '../config/dbMySql.js';

class BaseModel {
  static tableName = '';

  static async create(data) {
    const columns = Object.keys(data).join(', ');
    const placeholders = Object.keys(data).map(() => '?').join(', ');
    const values = Object.values(data);

    const query = `INSERT INTO ${this.tableName} (${columns}) VALUES (${placeholders})`;
    
    try {
      const result = await db.query(query, values);
      return result.insertId;
    } catch (error) {
      throw new Error(`Error creating ${this.tableName}: ${error.message}`);
    }
  }

  static async getAll() {
    const query = `SELECT * FROM ${this.tableName}`;
    
    try {
      const results = await db.query(query);
      return results;
    } catch (error) {
      throw new Error(`Error fetching ${this.tableName}: ${error.message}`);
    }
  }

  static async getById(id) {
    const query = `SELECT * FROM ${this.tableName} WHERE id = ?`;
    
    try {
      const results = await db.query(query, [id]);
      if (results.length === 0) {
        throw new Error(`${this.tableName} not found`);
      }
      return results[0];
    } catch (error) {
      throw new Error(`Error fetching ${this.tableName}: ${error.message}`);
    }
  }

  static async update(id, data) {
    const setClause = Object.keys(data).map(key => `${key} = ?`).join(', ');
    const values = [...Object.values(data), id];

    const query = `UPDATE ${this.tableName} SET ${setClause} WHERE id = ?`;
    
    try {
      const result = await db.query(query, values);
      if (result.affectedRows === 0) {
        throw new Error(`${this.tableName} not found`);
      }
      return result.affectedRows;
    } catch (error) {
      throw new Error(`Error updating ${this.tableName}: ${error.message}`);
    }
  }

  static async delete(id) {
    const query = `DELETE FROM ${this.tableName} WHERE id = ?`;
    
    try {
      const result = await db.query(query, [id]);
      if (result.affectedRows === 0) {
        throw new Error(`${this.tableName} not found`);
      }
      return result.affectedRows;
    } catch (error) {
      throw new Error(`Error deleting ${this.tableName}: ${error.message}`);
    }
  }
}

export default BaseModel;