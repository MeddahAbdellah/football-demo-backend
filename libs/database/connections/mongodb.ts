import mongoose from "mongoose";
// Destructure environment variables
const {
  MONGO_USERNAME,
  MONGO_PASSWORD,
  MONGO_PORT,
  MONGO_HOST,
  MONGO_DB_NAME,
} = process.env;

if (
  !MONGO_USERNAME ||
  !MONGO_PASSWORD ||
  !MONGO_PORT ||
  !MONGO_HOST ||
  !MONGO_DB_NAME
) {
  throw new Error("Please provide all MongoDB environment variables");
}

// Create a connection to MongoDB
(async () => {
  await mongoose.connect(`mongodb://${MONGO_HOST}:${MONGO_PORT}`, {
    user: MONGO_USERNAME,
    pass: MONGO_PASSWORD,
    dbName: MONGO_DB_NAME,
  });
})();

export {};
