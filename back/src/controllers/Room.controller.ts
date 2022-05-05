import Controller from "./Controller.js";
import Express from 'express';
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

  async insertUserToRoom(req: Express.Request, res: Express.Response) {
    const { userId } = req.body;
    const { id } = req.params;

    const response = await this.service.insertUserToRoom(id, userId);
    if (response?.error) {
        return res.status(response.statusCode ?? 400).send(response);
    }
    return res.status(201).send(response);
  }

  async deleteUserFromRoom(req: Express.Request, res: Express.Response) {
    const { userId, roomId } = req.params;
    const response = await this.service.deleteUserFromRoom(roomId, userId);
    if (response?.error) {
        return res.status(response.statusCode ?? 400).send(response);
    }
    return res.status(200).send(response);
  }

  async addMessageToRoom(req: Express.Request, res: Express.Response) {
    const { id } = req.params;
    const response = await this.service.addMessageToRoom(id, req.body);
    if (response?.error) {
        return res.status(response.statusCode ?? 400).send(response);
    }
    return res.status(201).send(response);
  }
}

export default new RoomController(roomService);
