import dotenv from 'dotenv';

let path = '.env.test';

if (process.env.NODE_ENV === 'dev') {
    path = '.env.dev';
}

if (process.env.NODE_ENV === 'prod') {
    path = '.env';
}

dotenv.config({ path });
