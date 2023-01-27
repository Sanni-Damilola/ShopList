import mongoose from "mongoose";

const dbConfig = async (): Promise<void> => {
  try {
    const db = await mongoose.connect("mongodb://0.0.0.0:27017/ECommerceApi");
    console.log(`database connected to ${db.connection.host}`);
  } catch (error) {
    console.log(`unable to connect to database`);
  }
};

export default dbConfig;
