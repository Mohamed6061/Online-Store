const { express } = require("../../index");
const UsersRoute = express.Router();
const { create } = require("../helpers/sequelizeHelpers")
const { User } = require('../../models/main');

UsersRoute.get("/", async (req, res) => {
    res.render("users", { page_title: "Dashboard" });
});


module.exports = UsersRoute;