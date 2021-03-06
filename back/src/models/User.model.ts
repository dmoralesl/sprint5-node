import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const User = mongoose.model('User', new Schema({
    name: {type: String, unique: true}
}, {timestamps: true}));

export default User;
