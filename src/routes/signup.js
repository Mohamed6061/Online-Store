const { express } = require("../../index");
const UsersRoute = express.Router();
const {create} =require("../helpers/sequelizeHelpers")
const { User } = require('../../models/main');
// const { query_runner, query_error } = require("../helpers/mysql_helpers");

UsersRoute.post("/", async (req, res) => {
  try {
  const data = await req.body
  create(User ,data)
  res.render("signup", {signup, page_title: "Sign Up" });
  } catch (error) {
  console.error(error.message);
  }
});


module.exports = UsersRoute;
