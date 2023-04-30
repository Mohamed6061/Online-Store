const { express } = require("../../index");
const loginRoute = express.Router();
const { User } = require('../../models/main');
const bcrypt = require('bcrypt');

loginRoute.get("/", (req, res) => {
  res.render("login", {  page_title: "LOGIN" });
});

loginRoute.post('/', async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ where: { email } });
  if (!user) {
    return res.status(401).send('<script>alert("Email is invalid");location.href="/login"</script>');
  }

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    return res.status(401).send('<script>alert("Password is invalid");location.href="/login"</script>');
  }

  res.render("home", { page_title: "Home" })
  // res.status(200).json({ message: 'Authentication successful' });
});


module.exports = {loginRoute };