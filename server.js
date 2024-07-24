const mongoose = require("mongoose");
const dotenv = require("dotenv");


dotenv.config();
const uri = `mongodb+srv://${encodeURIComponent(process.env.MONGO_USER_NAME)}:${encodeURIComponent(process.env.MONGO_PASSWORD)}@${process.env.MONGO_CLUSTER}/${process.env.MONGO_COLLECTION}?retryWrites=true&w=majority&appName=${process.env.MONGO_CLUSTER_NAME}`;
console.log({uri})
async function run() {
  mongoose
    .connect(uri)
    .then(() => console.log("MongoDB connected successfully"));
}

run().catch(console.dir);
