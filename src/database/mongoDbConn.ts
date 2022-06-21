import mongoose from "mongoose";
import { config } from "dotenv";

config();

async function createMongoDBConn() {
  await mongoose.connect(process.env.MONGODB_URL_CONN);
}

export { createMongoDBConn };