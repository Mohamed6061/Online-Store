// Finished File 
const { express } = require("../../index");
const loginRoute = express.Router();
const { User } = require('../../models/main');

loginRoute.get("/", (req, res) => {
  res.render("login", {  page_title: "LOGIN" });
});
loginRoute.post('/', async (req, res) => {
  const { email, password } = req.body;
  
});

module.exports = {loginRoute };