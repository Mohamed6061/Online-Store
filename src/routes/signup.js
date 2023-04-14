// Finished File, post request when user sign up, exits in users file not here!
const { express } = require("../../index");
const UsersRoute = express.Router();
const { User } = require('../../models/main');

UsersRoute.get("/", (req, res) => {
    res.render("login", { page_title: "SGIN UP | LOGIN IN" });
});

module.exports = UsersRoute;
