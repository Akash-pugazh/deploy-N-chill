import pg from 'pg-promise';

const pgp = pg();

const db = pgp({
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    database: process.env.DB_NAME || 'mydb',
    user: process.env.DB_USER || 'node_user',
    password: process.env.DB_PASSWORD 'karthick',
    });

export default db;