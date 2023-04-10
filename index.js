const express = require("express");
const app = express();
require('dotenv').config();
const port = process.env.PORT;
const hostname = process.env.HOST_NAME;

app.listen(port, hostname, () => {
        console.log("Server is up & running on port ")
});

module.exports = {
        app,
        express
};