const { express } = require("../../index");
const UsersRoute = express.Router();

UsersRoute.get("/", (req, res) => {
        res.render("product_detail", {  page_title: "Product Details" });

});


module.exports = UsersRoute;
