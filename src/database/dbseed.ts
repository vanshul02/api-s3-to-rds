import * as mysql from 'mysql';
import * as dotenv from 'dotenv';

dotenv.config({path: __dirname + '/.env'});

export const con = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT),
  database: process.env.DB_NAME,
});
