// Finished File 
const { express } = require("../../index");
const loginRoute = express.Router();
const { getOne } = require("../helpers/sequelizeHelpers")
const { User } = require('../../models/main');
let UserID;

loginRoute.get("/", (req, res) => {
  res.render("login", {  page_title: "LOGIN" });
});
loginRoute.post('/', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({
      where: {
        email: email,
        password: password
      }
    });
    if (user) {
      UserID = user.id;
      // console.log("user id from login", UserID)
      res.send(`<script>alert("Welcome"); window.location.href="/home";</script>`);
    } else {
      console.log("User not found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = {loginRoute ,UserID };