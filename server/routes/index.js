const express = require("express");
const router = express.Router();

const loginHandler = require("./loginHandler");
const authHandler = require("./authHandler");
const searchHandler = require("./searchHandler");
const infoHandler = require("./infoHandler");

router.get("/login", loginHandler);
router.get("/search-tracks", searchHandler);
router.get("/server-info", infoHandler);
router.post("/spotify-auth", authHandler);

router.get("/playlist", (req, res) => res.redirect("/"));
router.get("/search", (req, res) => res.redirect("/"));

module.exports = router;
