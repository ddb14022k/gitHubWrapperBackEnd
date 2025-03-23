const express = require("express");
const rateLimit = require("express-rate-limit");

const { getPublicRepoByUserName } = require("../services/githubService");
const router = express.Router();

//base on https://docs.github.com/en/rest/using-the-rest-api/rate-limits-for-the-rest-api?apiVersion=2022-11-28
const apiLimiter = rateLimit({
    windowMs: 60 * 1000 * 60, // 1 hour
    max: 5000,
    standardHeaders: true,
    legacyHeaders: false,
    message: "Too many requests from this IP, please try again after a minute",
});

router.use(apiLimiter);

router.get("/get-repos", async (req, res) => {
    if (!req.query.userName) {
        return res.status(400).send("Invalid query params");
    }

    try {
        const publicRepos = await getPublicRepoByUserName(req.query.userName);
        if (publicRepos.errorCode) {
            return res.status(publicRepos.errorCode).send(publicRepos.message);
        }

        return res.json(publicRepos);
    } catch (error) {
        return res.status(500).send("Internal Error");
    }
});

module.exports = router;
