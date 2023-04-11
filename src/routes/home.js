const { express } = require("../../index");
const UsersRoute = express.Router();

UsersRoute.get("/", (req, res) => {
        
        res.render("home", {  page_title: "Home" });

});


module.exports = UsersRoute;
