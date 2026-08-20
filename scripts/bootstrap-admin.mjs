#!/usr/bin/env node
/**
 * Bootstrap the first Super Admin securely.
 * Usage:
 *   ADMIN_BOOTSTRAP_EMAIL=you@faizzab.com \
 *   ADMIN_BOOTSTRAP_NAME="Site Admin" \
 *   ADMIN_BOOTSTRAP_PASSWORD='StrongPass!234' \
 *   MYSQL_HOST=... MYSQL_DATABASE=... MYSQL_USER=... MYSQL_PASSWORD=... \
 *   npm run admin:bootstrap
 *
 * Never hard-code production passwords. Password is hashed with bcrypt before storage.
 */
import bcrypt from "bcryptjs";
import mysql from "mysql2/promise";

const required = [
  "MYSQL_HOST",
  "MYSQL_DATABASE",
  "MYSQL_USER",
  "MYSQL_PASSWORD",
  "ADMIN_BOOTSTRAP_EMAIL",
  "ADMIN_BOOTSTRAP_PASSWORD",
];

for (const key of required) {
  if (!process.env[key]) {
    console.error(`Missing ${key}.`);
    process.exit(1);
  }
}

const email = process.env.ADMIN_BOOTSTRAP_EMAIL.toLowerCase().trim();
const name = process.env.ADMIN_BOOTSTRAP_NAME || "Super Admin";
const password = process.env.ADMIN_BOOTSTRAP_PASSWORD;

if (password.length < 12) {
  console.error("ADMIN_BOOTSTRAP_PASSWORD must be at least 12 characters.");
  process.exit(1);
}
if (!/[A-Z]/.test(password) || !/[a-z]/.test(password) || !/[0-9]/.test(password) || !/[^A-Za-z0-9]/.test(password)) {
  console.error("Password must include upper, lower, number and special character.");
  process.exit(1);
}

const hash = await bcrypt.hash(password, 12);

const connection = await mysql.createConnection({
  host: process.env.MYSQL_HOST,
  database: process.env.MYSQL_DATABASE,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  port: Number(process.env.MYSQL_PORT || 3306),
});

try {
  const [existing] = await connection.query("SELECT id FROM admin_users WHERE email = ?", [email]);
  if (Array.isArray(existing) && existing.length) {
    console.error("An admin with that email already exists.");
    process.exit(1);
  }

  await connection.query(
    `INSERT INTO admin_users
      (email, name, role, password_hash, is_active, failed_attempts, created_at)
     VALUES (?, ?, 'super_admin', ?, 1, 0, UTC_TIMESTAMP())`,
    [email, name, hash],
  );

  console.log(`Super Admin created for ${email}. Store the password securely; it is not recoverable from the database.`);
} catch (err) {
  console.error("Bootstrap failed.");
  console.error(err instanceof Error ? err.message : "Unknown error");
  process.exit(1);
} finally {
  await connection.end();
}
