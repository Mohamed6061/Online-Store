// Finished File 
const { express } = require("../../index");
const loginRoute = express.Router();
const { User } = require('../../models/main');
const bcrypt = require('bcrypt');

loginRoute.get("/", (req, res) => {
  res.render("login", {  page_title: "LOGIN" });
});



loginRoute.post('/login', async (req, res) => {
  const { username, password } = req.body;


  const user = await User.findOne({ where: { username } });
  if (!user) {
    return res.status(401).send(  `<script>alert(username or password are invalid);</script>`);
  }


  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    return res.status(401).send( `<script>alert(username or password are invalid);</script>`);
  }

  
  res.render("products", { page_title: "Products" })
  res.status(200).json({ message: 'Authentication successful' });
});

module.exports = {loginRoute };