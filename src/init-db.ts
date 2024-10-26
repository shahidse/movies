import { createConnection } from 'typeorm';
export async function initDb(host, port, username, password, databaseName) {
  // Database connection details
  const dbConfig = {
    host: host,
    port: port,
    username: username,
    password: password,
  };
  const connection = await createConnection({
    type: 'mysql',
    host: dbConfig.host,
    port: dbConfig.port,
    username: dbConfig.username,
    password: dbConfig.password,
  });
  await connection.query(`CREATE DATABASE IF NOT EXISTS \`${databaseName}\``);
  await connection.close();
}
