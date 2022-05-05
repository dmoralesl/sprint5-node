import { IMessage } from "../interfaces.js";
import Service from "./Service.js";

class RoomService extends Service {
  constructor(model: any) {
    super(model);
    this.insertUserToRoom = this.insertUserToRoom.bind(this);
    this.deleteUserFromRoom = this.deleteUserFromRoom.bind(this);
    this.addMessageToRoom = this.addMessageToRoom.bind(this);
  }
 
  async insertUserToRoom(roomId: string, userId: string) {
    try {
        const item = await this.model.findByIdAndUpdate(roomId, { $addToSet: {users: userId}}, {new: true});
        if (!item) {
            return {
                error: true,
                statusCode: 404,
                message: 'Room not found'
            }
        }
        return {
        error: false,
        item
        }
      } catch (error: any) {
        return {
          error: true,
          statusCode: 400,
          message: error.errmsg || 'Not able to add user to room',
          errors: error.errors
        }
      }
  }

  async deleteUserFromRoom(roomId: string, userId: string) {
    try {

        const item = await this.model.findByIdAndUpdate({_id: roomId}, { $pullAll: {users: [userId]}}, {new: true});
        console.log("ITEM", item, roomId, userId);
        if (item)
          return {
            error: false,
            item
          }
      } catch (error: any) {
        return {
          error: true,
          statusCode: 400,
          message: error.errmsg || 'Not able to remove user from room',
          errors: error.errors
        }
      }
  }

  async addMessageToRoom(roomId: string, message: IMessage) {
    try {
        console.log(roomId, message);
        const item = await this.model.findByIdAndUpdate(roomId, { $push: {messages: message}}, {new: true});
        if (item)
          return {
            error: false,
            item
          }
      } catch (error: any) {
        return {
          error: true,
          statusCode: 400,
          message: error.errmsg || 'Not able to add message to room',
          errors: error.errors
        }
      }
  }
}

export default RoomService;
