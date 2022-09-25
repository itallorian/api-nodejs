import express from "express";
import PlaylistService from "../services/playlist.service.js";
import TokenMiddleware from "../middlewares/token.middleware.js";

const endpoints = express.Router();
endpoints.use(TokenMiddleware.ValidateToken);

endpoints
    .get("/playlists", PlaylistService.GetPlaylistByQuery)
    .get("/playlists/list", PlaylistService.GetPlaylists)
    .get("/playlists/:id", PlaylistService.GetPlaylist)
    .post("/playlists", PlaylistService.InsertPlaylist)
    .post("/playlists/interaction", PlaylistService.InsertInteraction);

export default endpoints;