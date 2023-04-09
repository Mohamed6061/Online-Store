const { express } = require("../../../../index");
const poolPromised = require(".././../../../mysql")
const usersAPIRouter = express.Router();
const { query_runner, query_error } = require("../../../helpers/mysql_helpers");

usersAPIRouter.get("/", (req, res) => {
        // query_runner("SELECT * FROM author")
        //         .then(([rows]) => res.json(rows))
        //         .catch((err) => res.json(query_error(err.message)));
});

module.exports = usersAPIRouter;