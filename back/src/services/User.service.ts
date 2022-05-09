import { Model } from 'mongoose';
import Service from './Service.js'
import User from '../models/User.model.js';

class UserService extends Service {
  constructor (model: Model<typeof User>) {
    super(model)
  }

}

export default UserService;
