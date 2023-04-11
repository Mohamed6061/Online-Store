const { express } = require("../../index");
const UsersRoute = express.Router();
const { query_runner, query_error } = require("../helpers/mysql_helpers");

UsersRoute.get("/", (req, res) => {
        
        res.render("home", {  page_title: "Home" });

});


module.exports = UsersRoute;
