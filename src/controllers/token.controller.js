import express from "express";
import TokenService from "../services/token.service.js"

const endpoints = express.Router();

endpoints
    .get("/token/validate", TokenService.ValidateToken)
    .post("/token", TokenService.GenerateToken);

export default endpoints;