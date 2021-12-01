import pg from 'pg';

const { Pool } = pg;

let connectionData = {
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
};

if (process.env.NODE_ENV === 'prod') {
    connectionData = {
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false,
        },
    };
}

const connection = new Pool(connectionData);

export default connection;
