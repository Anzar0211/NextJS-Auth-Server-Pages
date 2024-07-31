import mongoose from "mongoose";

const connectDB = async () => {
  const DB_URI =process.env.DB_URI
  mongoose
    .connect(DB_URI)
    .then(() => console.log("MONGODB CONNECTED SUCCESSFULLY"))
    .catch((e) => {
      console.log("ERROR CONNECTING TO MONGODB", e);
    });
};

export default connectDB;
