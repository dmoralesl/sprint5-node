import mongoose from "mongoose";

const Schema = mongoose.Schema;

const Room = mongoose.model(
  "Room",
  new Schema({
    name: { type: String, unique: true },
    description: String,
    createdBy: String,
    users: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  })
);

export default Room;
