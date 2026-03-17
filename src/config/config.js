import dotenv from "dotenv";

dotenv.config();

// Validate required env variables
if (!process.env.MONGODB_URL) {
  throw new Error("MONGODB_URL is not defined");
}

const config = {
  PORT: process.env.PORT || 4000,
  MONGODB_URL: process.env.MONGODB_URL,
};

export default config;
