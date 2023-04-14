const { express } = require("../../index");
const UsersRoute = express.Router();
const { getOne } = require("../helpers/sequelizeHelpers")
const { User } = require('../../models/main');

UsersRoute.get("/", (req, res) => {
  res.render("login", {  page_title: "LOGIN" });
});
// This is request not finished need to complete, need to check if users email exits in database  and password is correct.
// if email exists and enterd correct password allow hom to enter users page
UsersRoute.post('/', (req, res) => {
  const { email, password } = req.body;
  try {
    getOne(User, email, password)
    res.render("login", { login, page_title: "Log In" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


module.exports = UsersRoute;
