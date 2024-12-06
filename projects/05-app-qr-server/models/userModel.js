import db from '../config/dbMySql.js';

class User  {
  static tableName = 'users';

  static async getByEmail(email) {
    const query = `SELECT * FROM ${this.tableName} WHERE email = ?`;

    try {
      const results = await db.query(query, [email]);
      if (results.length === 0) {
        throw new Error(`${this.tableName} not found`);
      }
      return results[0];
    } catch (error) {
      throw new Error(`Error fetching ${this.tableName}: ${error.message}`);
    }
      
  }

  static async login(email, password) {
    const query = `SELECT * FROM ${this.tableName} WHERE email = ? AND password = ?`;

    try {
      const results = await db.query(query, [email, password]);
      if (results.length === 0) {
        throw new Error('Invalid email or password');
      }
      return results[0];
    } catch (error) {
      throw new Error(`Error fetching ${this.tableName}: ${error.message}`);
    }
  }
}

export default User;