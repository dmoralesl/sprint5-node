import { IMessage, IRoom } from "../interfaces";

import mongoose from "mongoose";

const Schema = mongoose.Schema;


const Message = new Schema<IMessage>({
    content: { type: String, required: true },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  }, {timestamps: true});

const Room = mongoose.model(
  "Room",
  new Schema<IRoom>({
    name: { type: String, unique: true },
    description: String,
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    users: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    messages: [Message],
  }, {timestamps: true})
);

export default Room;
