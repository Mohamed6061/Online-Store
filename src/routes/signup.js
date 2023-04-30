const { express } = require("../../index");
const UsersRoute = express.Router();
const { User } = require("../../models/main");
const { create } = require("../../src/helpers/sequelizeHelpers");
const { Op } = require("sequelize");
const bcrypt = require('bcrypt');

UsersRoute.get("/", (req, res) => {
  res.render("login", { page_title: "SGIN UP | LOGIN IN" });
});

UsersRoute.post("/", async (req, res) => {
  const { username, password } = req.body;

  // Check if a user with the same username already exists
  const existingUser = await User.findOne({ where: { username } });
  if (existingUser) {
    return res
      .status(400)
      .send(
        `<script>alert("User already exists");</script>`
      );
  }

  // Hash the user's password
  const hashedPassword = await bcrypt.hash(password, 10);


  try {
    const user = await User.create({
      username,
      password: hashedPassword,
    });
    res.status(201);
    res.render("products", { page_title: "Products" })
  } catch (err) {
    console.error(err);
    res.status(500).send(  `<script>alert("error happen");</script>`);
  }
});

module.exports = UsersRoute;
