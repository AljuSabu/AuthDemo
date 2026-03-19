import dotenv from "dotenv";

dotenv.config();

// Validate required env variables
if (!process.env.MONGODB_URL) {
  throw new Error("MONGODB_URL is not defined");
}

if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined");
}

const config = {
  PORT: process.env.PORT || 5000,
  MONGODB_URL: process.env.MONGODB_URL,
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRY: process.env.JWT_EXPIRY,
};

export default config;
