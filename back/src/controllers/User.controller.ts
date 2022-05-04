import Controller from  './Controller.js';
import User from "./../models/User.model";
import UserService from '../services/User.service.js';

const userService = new UserService(
    User
  );
  

class UserController extends Controller {
    constructor(service: any) {
        super(service);
      }
}

export default new UserController(userService);

