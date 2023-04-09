const express = require("express");
const app = express();

app.listen(5050, 'localhost', () => {
        console.log("Server is up & running on port ")
});

module.exports = {
        app,
        express
};