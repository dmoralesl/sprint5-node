import { Model } from "mongoose";
import { IMessage, IRoom } from "../interfaces.js";
import Service from "./Service.js";

class RoomService extends Service {
  constructor(model: Model<IRoom>) {
    super(model);
    this.insertUserToRoom = this.insertUserToRoom.bind(this);
    this.deleteUserFromRoom = this.deleteUserFromRoom.bind(this);
    this.addMessageToRoom = this.addMessageToRoom.bind(this);
  }
 
  async getAll () {
    try {
      const rows = await this.model.find().populate('users').populate('createdBy').populate('messages.user');
      return {
        error: false,
        statusCode: 200,
        data: rows
      }
    } catch (errors) {
        console.log('errors', errors)
      return {
        error: true,
        statusCode: 400,
        errors
      }
    }
  }

  async getById (id: string) {
      try {
        const register = await this.model.findById(id).populate('users');
  
        return {
          error: false,
          statusCode: 200,
          data: register
        }
      } catch (errors) {
        return {
          error: true,
          statusCode: 400,
          errors
        }
      }
    }

  async getByAttr (field: string, value: any) {
    try {
      const data = await this.model.find({
          [field]: value
      }).populate('users');
      return {
        error: false,
        statusCode: 200,
        data
      }
    } catch (errors) {
      return {
        error: true,
        statusCode: 400,
        errors
      }
    }
  }

  async insert (dataInput: object) {
    try {
      let data = await this.model.create(dataInput);
      data = await data.populate('createdBy');
      if (data)
        return {
          error: false,
          data
        }
    } catch (error: any) {
      console.log(error)
      return {
        error: true,
        statusCode: 400,
        message: error.errmsg || 'Not able to create item',
        errors: error.errors
      }
    }
  }

  async insertUserToRoom(roomId: string, userId: string) {
    try {
        const data = await this.model.findByIdAndUpdate(roomId, { $addToSet: {users: userId}}, {new: true}).populate('users');
        if (!data) {
            return {
                error: true,
                statusCode: 404,
                message: 'Room not found'
            }
        }
        return {
        error: false,
        data
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

        const data = await this.model.findByIdAndUpdate({_id: roomId}, { $pullAll: {users: [userId]}}, {new: true}).populate('users');
        if (data)
          return {
            error: false,
            data
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
        const data = await this.model.findByIdAndUpdate(roomId, { $push: {messages: message}}, {new: true}).populate('users');
        if (data)
          return {
            error: false,
            data
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
