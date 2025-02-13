// Get variables from .env file for database connection
const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

// Create a connection pool to the database
import { createPool } from "mysql2/promise";

const databaseClient = createPool({
  host: DB_HOST,
  port: Number.parseInt(DB_PORT as string),
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
});

// Ready to export
export default databaseClient;

// Types export
import type { Pool, ResultSetHeader, RowDataPacket } from "mysql2/promise";

type DatabaseClient = Pool;
type Result = ResultSetHeader;
type Rows = RowDataPacket[];

export type { DatabaseClient, Result, Rows };
