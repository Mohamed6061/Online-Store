const { express } = require("../../index");
const UsersRoute = express.Router();

// need to add products to page 
UsersRoute.get("/", (req, res) => {
        
        res.render("home", {  page_title: "Home" });

});


module.exports = UsersRoute;
