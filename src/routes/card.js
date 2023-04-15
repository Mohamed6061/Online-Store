const { express } = require("../../index");
const UsersRoute = express.Router();

// if there is data on order items table, Show(render) them on this page (Card)
// when user click on "Add to Card" on product details. make post request and add this product to order items table
UsersRoute.get("/", (req, res) => {

   res.render("card", { page_title: "Card" });

});


module.exports = UsersRoute;
