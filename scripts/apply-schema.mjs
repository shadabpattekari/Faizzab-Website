#!/usr/bin/env node
/**
 * Apply MySQL schema for FaizZab admin/leads/CMS.
 * Usage: MYSQL_HOST=... MYSQL_DATABASE=... MYSQL_USER=... MYSQL_PASSWORD=... npm run db:schema
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import mysql from "mysql2/promise";

const required = ["MYSQL_HOST", "MYSQL_DATABASE", "MYSQL_USER", "MYSQL_PASSWORD"];
for (const key of required) {
  if (!process.env[key]) {
    console.error(`Missing ${key}. Set MySQL environment variables before running.`);
    process.exit(1);
  }
}

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const sql = fs.readFileSync(path.join(__dirname, "schema.sql"), "utf8");

const connection = await mysql.createConnection({
  host: process.env.MYSQL_HOST,
  database: process.env.MYSQL_DATABASE,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  port: Number(process.env.MYSQL_PORT || 3306),
  multipleStatements: true,
});

try {
  await connection.query(sql);
  console.log("Schema applied successfully.");
} catch (err) {
  console.error("Schema application failed.");
  console.error(err instanceof Error ? err.message : "Unknown error");
  process.exit(1);
} finally {
  await connection.end();
}
