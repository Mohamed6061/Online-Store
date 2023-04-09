const { express } = require("../../index");
const UsersRoute = express.Router();
const { query_runner, query_error } = require("../helpers/mysql_helpers");

UsersRoute.get("/", (req, res) => {
        query_runner("SELECT * FROM author")
                .then(([rows]) => {
                        return res.render("products", { users: rows, page_title: "products" });
                }
                )
                .catch((err) => res.json(query_error(err.message)));
});


module.exports = UsersRoute;
