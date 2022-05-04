import mongoose from "mongoose";

let database: mongoose.Connection;

export const connect = () => {
  // add your own uri below
  const uri =
    "mongodb+srv://<username>:<password>@cluster0-v6q0g.mongodb.net/test?retryWrites=true&w=majority";
  if (database) {
    return;
  }
  mongoose.connect("mongodb://localhost:27017/chat_sockets");

  database = mongoose.connection;
  database.once("open", async () => {
    console.log("Connected to database");
  });
  database.on("error", () => {
    console.log("Error connecting to database");
  });
};

export const disconnect = () => {
  if (!database) {
    return;
  }
  mongoose.disconnect();
};
