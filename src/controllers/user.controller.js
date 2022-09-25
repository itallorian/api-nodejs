import express from "express";
import UserService from "../services/user.service.js";
import TokenMiddleware from "../middlewares/token.middleware.js";

const endpoints = express.Router();
endpoints.use(TokenMiddleware.ValidateToken);

endpoints
    .get("/users/:id", UserService.GetUserById)
    .post("/users", UserService.InsertUser)
    .post("/users/login", UserService.AccessUser)
    .patch("/users", UserService.UpdateUser);

export default endpoints;