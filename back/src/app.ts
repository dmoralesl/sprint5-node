import Room from "./models/Room.model";
import RoomController from "./controllers/Room.controller";
import RoomService from "./services/Room.service";
import { Server, Socket } from 'socket.io';
import User from "./models/User.model";
import UserController from "./controllers/User.controller";
import UserService from "./services/User.service";
import bodyParser from "body-parser";
import { connect } from "./database";
import cors from 'cors';
import { createServer } from 'http';
import express from "express";

// Express APP config
const app = express();
app.use(express.json());
app.use(cors());
app.set("port", process.env.PORT || 3000);

// Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const httpServer = createServer(app);
export const io = new Server(httpServer, { cors: { origin: '*' }});


io.on('connection', (socket: any) => {
  const roomId = socket.request._query.roomId;
  socket.join(roomId);
  socket.on('disconnect', (reason: string) => {
    // Cleaning user
    const userId = socket.request._query.userId;
    if (reason === 'client namespace disconnect') { return; } // User is just reconnecting with custom data, not closing chat

    new RoomService(Room).deleteUserFromRoom(roomId, userId);
    io.to(roomId).emit('userLeftRoom', userId);
    new UserService(User).delete(userId);

  })
  socket.emit('newMessage', "Welcome to the room");
});

app.set('io', io);

// API Endpoints
app.get("/users", UserController.getAll);
app.get("/users/:id", UserController.getById);
app.post("/users", UserController.insert);
app.delete("/users/:id", UserController.delete);

app.get("/rooms", RoomController.getAll);
app.get("/rooms/:id", RoomController.getById);
app.post("/rooms", RoomController.insert);
app.delete("/rooms/:id", RoomController.delete);

app.post("/rooms/:id", RoomController.insertUserToRoom);
app.delete("/rooms/:roomId/:userId", RoomController.deleteUserFromRoom);
app.post("/rooms/:id/message", RoomController.addMessageToRoom);


// Handling non valid routes (404)
app.all("/*", (req, res, next) => {
  res.status(404);
  res.json({
    message: "Route not found",
  });
});


const server = httpServer.listen(app.get("port"), async () => {
  console.log("App is running on http://localhost:%d", app.get("port"));
  connect();
});
