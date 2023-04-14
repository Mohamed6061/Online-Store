const { express } = require("../../index");
const UsersRoute = express.Router();

// if there is data in order table show(render) them in this page 
UsersRoute.get("/", (req, res) => {

        res.render("checkout", {  page_title: "Checkout" });

});


module.exports = UsersRoute;
