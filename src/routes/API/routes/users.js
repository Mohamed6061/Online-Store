const { express } = require("../../../../index");
const userAPIRouter = express.Router();
const { getAll } = require('../../../helpers/sequelizeHelpers');
const { User } = require('../../../../models/main');

userAPIRouter.get("/", async (req, res) => {
        try {
                const allUsers = await getAll(User);
                res.send(allUsers);
        } catch (error) {
                console.error(error.message);
        }
});

userAPIRouter.post("/del/:id", async (req, res) => {
        const id = req.params.id;
        try {
                const user = await User.findOne({ where: { id: id } });
                if (!user) {
                        return res.status(404).json({ error: "order not found" });
                }
                await user.destroy();
                res.status(500).send(`<script>alert("Deleted");location.href = "/users" </script>`);
        } catch (err) {
                res.status(500).json({ error: "Internal server error" });
        }
});

userAPIRouter.post("/upgrade/:id", async (req, res) => {
        const id = req.params.id;
        try {
                // let USERId = req.session.userInfo.id;
                await User.update({ role : "admin" }, { where: { id } });

                res.send('<script>alert("Name updated successfully"); window.location.href = "/users";</script>');

        } catch (error) {
                console.log(error);
        }
})
module.exports = userAPIRouter;
