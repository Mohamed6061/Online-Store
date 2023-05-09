const { express } = require("../../index");
const loginRoute = express.Router();
const { User } = require('../../models/main');
const bcrypt = require('bcrypt');

loginRoute.get("/", (req, res) => {
  res.render("login", { page_title: "LOGIN" });
});

loginRoute.post('/', async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ where: { email } });
  if (!user) {
    return res.status(401).send('<script>alert("Email is invalid");location.href="/login"</script>');
  }
  // to upadate user with id 1 to admin
  await User.update({ role: "admin" }, { where: { id: 1 } });

  // check if password is correct
  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    return res.status(401).send('<script>alert("Password is invalid");location.href="/login"</script>');
  } else {
    // make session
    req.session.userInfo = user;
    return res.send(`<script>alert("Welcome ${req.session.userInfo.name}"); window.location.href="/home";</script>`);
  }
});


module.exports = { loginRoute };
