import dotenv from 'dotenv';

dotenv.config();

export default {
    port: process.env.PORT,
    mongoURL: process.env.MONGO_URL,
    db_name: process.env.DB_NAME,
    db_password: process.env.DB_PASSWORD,
    jwt_secret_key: process.env.JWT_SECRET_KEY,
    jwt_cookie_name: process.env.JWT_COOKIE_NAME
};
