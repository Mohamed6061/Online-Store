const { express } = require("../../index");
const UsersRoute = express.Router();

UsersRoute.get("/", (req, res) => {
        
        res.render("products", {  page_title: "Products" });

});


module.exports = UsersRoute;
