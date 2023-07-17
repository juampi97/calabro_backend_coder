import dotenv from "dotenv";

dotenv.config();

export default {
  app: {
    persistence: process.env.PERSISTENCE,
  },
  mongo: {
    url: process.env.MONGO_URL,
  },
  port: process.env.PORT,
  db_name: process.env.DB_NAME,
  db_password: process.env.DB_PASSWORD,
  jwt_secret_key: process.env.JWT_SECRET_KEY,
  jwt_cookie_name: process.env.JWT_COOKIE_NAME,
  cookie_parser: process.env.COOKIEPARSER,
};
