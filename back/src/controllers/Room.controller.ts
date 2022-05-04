import Controller from  './Controller.js';
import Room from "./../models/Room.model";
import RoomService from './../services/Room.service';

const roomService = new RoomService(
    Room
  );
  

class RoomController extends Controller {
    constructor(service: any) {
        super(service);
      }
}

export default new RoomController(roomService);
