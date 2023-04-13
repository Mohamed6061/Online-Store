const { express } = require("../../index");
const UsersRoute = express.Router();
const { getOne } = require("../helpers/sequelizeHelpers")
const { User } = require('../../models/main');
UsersRouteapppost('/login',(req, res) => {
  const { email, password } = req.body;
  try {
getOne(User ,email ,password)
    res.render("login", { login, page_title: "Log In" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


module.exports = UsersRoute;
