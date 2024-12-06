import mysql from "mysql2/promise";

const dbConfig = {
  host: "localhost",
  user: "my_user",
  password: "my_password",
  database: "my_database",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
};

class Database {
  constructor() {
    this.pool = null;
  }

  async connect() {
    try {
      this.pool = await mysql.createPool(dbConfig);
      console.log("Connected to MySQL server");
      return this.pool;
    } catch (error) {
      console.error("Error connecting to the database:", error.message);
      throw error;
    }
  }

  async query(sql, params) {
    if (!this.pool) await this.connect();
    try {
      const [results] = await this.pool.execute(sql, params);

      return results;
    } catch (error) {
      console.error("Error executing query:", error.message);
      throw error;
    }
  }

  async close() {
    if (this.pool) {
      await this.pool.end();
      console.log("Database connection closed");
    }
  }
}

export const db = new Database();

export default db;
