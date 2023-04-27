const { express } = require("../../index");
const UsersRoute = express.Router();

UsersRoute.get("/" , (req, res) => {
   res.render("card", { page_title: "Card"});
});


module.exports = UsersRoute;
