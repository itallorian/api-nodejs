import express from "express";
import tokenEndpoints from "./token.controller.js";
import userEndpoints from "./user.controller.js";
import playlistEndpoints from "./playlist.controller.js";

const endpoints = (startup) => {
    startup.route("/").get((req, res) => res.status(403).send());
    startup.use(
        express.json(),
        tokenEndpoints,
        userEndpoints,
        playlistEndpoints
    );
}

export default endpoints;