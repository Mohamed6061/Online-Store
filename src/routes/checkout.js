const { express } = require("../../index");
const UsersRoute = express.Router();

UsersRoute.get("/", (req, res) => {

        res.render("checkout", {  page_title: "Checkout" });

});


module.exports = UsersRoute;
