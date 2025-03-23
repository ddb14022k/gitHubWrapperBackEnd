const express = require("express");
const cors = require("cors");
const gitHubRouter = require("./routers/githubRouter");

const app = express();
const port = 3001;

app.use(cors());
app.use("/github", gitHubRouter);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
