const { express } = require("../../index");
const UsersRoute = express.Router();
const {UserID} = require("./login")

// need to add products to page 
UsersRoute.get("/", (req, res) => {
        console.log("user id ", UserID)
        res.render("home", {  page_title: "Home" });

});


module.exports = UsersRoute;
