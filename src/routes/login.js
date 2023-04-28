// Finished File 
const { express } = require("../../index");
const loginRoute = express.Router();
const { User } = require('../../models/main');

loginRoute.get("/", (req, res) => {
  res.render("login", {  page_title: "LOGIN" });
});
loginRoute.post('/', async (req, res) => {
  const { email, password } = req.body;
  if(!email){
    console.log("please login")
    return
  }
  const comparFun =async() =>{

     const user =await User.findOne({
      where: { password }
    })
    if(!user){
      console.log("THERE IS NO USER")
      return
    }
    const pass = user.password
    if(pass === password){
      console.log("welcome user")
    }
  }
  try{
comparFun()
  }catch(err){
    console.log(err)
  }

});

module.exports = {loginRoute };