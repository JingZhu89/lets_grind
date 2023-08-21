import mongoose from "mongoose";
mongoose.set("strictQuery", false);
const url = process.env.MONGOURI ? process.env.MONGOURI : "";
mongoose
  .connect(url)
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
  });

export default mongoose;
