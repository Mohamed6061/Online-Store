const { express } = require("../../index");
const UsersRoute = express.Router();
const { User } = require("../../models/main");
const bcrypt = require('bcrypt');

UsersRoute.get("/", (req, res) => {
  res.render("login", { page_title: "SGIN UP | LOGIN IN" });
});

UsersRoute.post("/", async (req, res) => {
  const { name, password ,email } = req.body;

  // Check if a user with the same username already exists
  const existingUser = await User.findOne({ where: { name } });
  const existingEmail = await User.findOne({ where: { email } });
  if (existingUser) {
    return res
      .status(400)
      .send(
        `<script>alert("User already exists");location.href = "/signup"</script>`
      );
  }
  if (existingEmail ) {
    return res
      .status(400)
      .send(
        `<script>alert("Email already exists");location.href = "/signup"</script>`
      );
  }

  // Hash the user's password
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    User.create({
      name ,
      password: hashedPassword,
      email
    });
    res.status(201);
    res.render("home", { page_title: "Home" })
    
  } catch (err) {
    console.error(err);
    res.status(500).send(  `<script>alert("error happen");</script>`);
  }
});

module.exports = UsersRoute;
