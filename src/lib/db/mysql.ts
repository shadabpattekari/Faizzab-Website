import mysql, { type Pool, type ResultSetHeader, type RowDataPacket } from "mysql2/promise";

let pool: Pool | null = null;

export function isDatabaseConfigured(): boolean {
  return Boolean(
    process.env.MYSQL_HOST &&
      process.env.MYSQL_DATABASE &&
      process.env.MYSQL_USER &&
      process.env.MYSQL_PASSWORD,
  );
}

export function getPool(): Pool | null {
  if (!isDatabaseConfigured()) return null;
  if (!pool) {
    pool = mysql.createPool({
      host: process.env.MYSQL_HOST,
      database: process.env.MYSQL_DATABASE,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      port: Number(process.env.MYSQL_PORT || 3306),
      waitForConnections: true,
      connectionLimit: 5,
      namedPlaceholders: true,
      timezone: "Z",
    });
  }
  return pool;
}

type SqlParam = string | number | boolean | null | undefined;
type SqlParams = Record<string, SqlParam> | SqlParam[];

export async function queryRows<T extends RowDataPacket[]>(
  sql: string,
  params?: SqlParams,
): Promise<T | null> {
  const db = getPool();
  if (!db) return null;
  const [rows] = await db.query<T>(sql, params as never);
  return rows;
}

export async function execute(
  sql: string,
  params?: SqlParams,
): Promise<ResultSetHeader | null> {
  const db = getPool();
  if (!db) return null;
  const [result] = await db.execute<ResultSetHeader>(sql, params as never);
  return result;
}

export type { RowDataPacket, ResultSetHeader };
