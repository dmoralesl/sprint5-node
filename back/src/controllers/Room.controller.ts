import Controller from "./Controller.js";
import Express from 'express';
import { IUser } from './../../../front/src/app/interfaces/SocketModels';
import Room from "./../models/Room.model";
import RoomService from "./../services/Room.service";

const roomService = new RoomService(Room);

class RoomController extends Controller {

    service: RoomService;

  constructor(service: RoomService) {
    super(service);
    this.service = service;
    this.insertUserToRoom = this.insertUserToRoom.bind(this);
    this.deleteUserFromRoom = this.deleteUserFromRoom.bind(this);
    this.addMessageToRoom = this.addMessageToRoom.bind(this);
  }

  async insert(req: Express.Request, res: Express.Response) {
    const response = await this.service.insert(req.body);
    if (response?.error) return res.status(response.statusCode || 500).send(response);
    req.app.get('io').to('lobby').emit('newRoom', response?.data);

    return res.status(201).send(response);
  }

  async delete(req: Express.Request, res: Express.Response) {
    const { id } = req.params;
  
    const response = await this.service.delete(id);

    req.app.get('io').to('lobby').emit('removedRoom', id);
    return res.status(response.statusCode).send(response);
  }    

  async insertUserToRoom(req: Express.Request, res: Express.Response) {
    const { userId } = req.body;
    const { id } = req.params;

    const response = await this.service.insertUserToRoom(id, userId);
    if (response?.error) {
        return res.status(response.statusCode ?? 400).send(response);
    }
    req.app.get('io').to(id).emit('userJoinRoom', response.data.users.find((u: IUser) => u._id?.toString() === userId));
    return res.status(201).send(response);
  }

  async deleteUserFromRoom(req: Express.Request, res: Express.Response) {
    const { userId, roomId } = req.params;
    const response = await this.service.deleteUserFromRoom(roomId, userId);
    if (response?.error) {
        return res.status(response.statusCode ?? 400).send(response);
    }
    req.app.get('io').to(roomId).emit('userLeftRoom', userId);
    return res.status(200).send(response);
  }

  async addMessageToRoom(req: Express.Request, res: Express.Response) {
    const { id } = req.params;
    const response = await this.service.addMessageToRoom(id, req.body);
    if (response?.error) {
        return res.status(response.statusCode ?? 400).send(response);
    }

    req.app.get('io').to(id).emit('newMessage', req.body);
    return res.status(201).send(response);
  }
}

export default new RoomController(roomService);
