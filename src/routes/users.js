const { express } = require("../../index");
const UsersRoute = express.Router();
const { create } = require("../helpers/sequelizeHelpers")
const { User } = require('../../models/main');

UsersRoute.post("/", async (req, res) => {
        try {
                const data = await req.body
                // console.log(req.body)
                create(User, data)
                res.render("users", {data, page_title: "Dashboard" });
        } catch (error) {
                console.error(error.message);
        }
});


module.exports = UsersRoute;