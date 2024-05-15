import mongoose from "mongoose";
import fs from "fs";

const connectDB = async () => {
  try {
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(
        "mongodb+srv://ghulam:1234@cluster0.jsqqnid.mongodb.net/vr-db?retryWrites=true&w=majority&appName=Cluster0"
      );
      console.log("db connected");

      const db = mongoose.connection.db; // Accessing the underlying native MongoDB driver

      const { GridFSBucket } = mongoose.mongo; // Access GridFSBucket through mongoose.mongo

      const bucket = new GridFSBucket(db, { bucketName: "fs" }); // Create GridFSBucket instance
      console.log("GridFSBucket created");
      fs.createReadStream("./1.jpg").pipe(
        bucket.openUploadStream("myFile", {
          chunkSizeBytes: 1048576,
          metadata: { field: "myField", value: "myValue" },
        })
      );
    }
  } catch (error) {
    console.log(error);
  }
};

export default connectDB;
