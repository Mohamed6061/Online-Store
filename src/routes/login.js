const { express } = require("../../index");
const UsersRoute = express.Router();

UsersRoute.get("/", (req, res) => {
        
        res.render("login", { page_title: "LOGIN" });

});


module.exports = UsersRoute;
