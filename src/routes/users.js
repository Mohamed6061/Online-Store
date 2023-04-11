const { express } = require("../../index");
const UsersRoute = express.Router();

UsersRoute.get("/", (req, res) => {
        
        res.render("users", {  page_title: "users" });

});

module.exports = UsersRoute;
