const { express } = require("../../../../index");
const userAPIRouter = express.Router();
const { getAll  } = require('../../../helpers/sequelizeHelpers');
const {User} = require('../../../../models/main');

userAPIRouter.get("/", async (req, res) => {
        try {
                const allUsers = await getAll(User);
                // console.log(allUsers);
                res.send(allUsers);
        } catch (error) {
                console.error(error.message);
        }
});

module.exports = userAPIRouter;
