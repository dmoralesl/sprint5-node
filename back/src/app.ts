import RoomController from "./controllers/Room.controller";
import UserController from "./controllers/User.controller";
import bodyParser from "body-parser";
import { connect } from "./database";
import express from "express";

// Express APP config
const app = express();
app.use(express.json());
app.set("port", process.env.PORT || 3000);

// Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// API Endpoints
app.get("/users", UserController.getAll);
app.get("/users/:id", UserController.getById);
app.post("/users", UserController.insert);
app.delete("/users/:id", UserController.delete);

app.get("/rooms", RoomController.getAll);
app.get("/rooms/:id", RoomController.getById);
app.post("/rooms", RoomController.insert);
app.put("/rooms/:id", RoomController.update);
app.delete("/rooms/:id", RoomController.delete);

// Handling non valid routes (404)
app.all("/*", (req, res, next) => {
  res.status(404);
  res.json({
    message: "Route not found",
  });
});

const server = app.listen(app.get("port"), async () => {
  console.log("App is running on http://localhost:%d", app.get("port"));
  await connect();
});
