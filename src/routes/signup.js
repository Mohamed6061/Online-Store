const { express } = require("../../index");
const UsersRoute = express.Router();
const { User } = require('../../models/main');
const {  create } = require('../../src/helpers/sequelizeHelpers');
const { Op } = require('sequelize');

UsersRoute.get("/", (req, res) => {
    res.render("login", { page_title: "SGIN UP | LOGIN IN" });
});

UsersRoute.post('/', (req, res) => {
    const data = req.body;
});

module.exports = UsersRoute;
