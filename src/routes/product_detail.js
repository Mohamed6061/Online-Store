const { express } = require("../../index");
const UsersRoute = express.Router();
const { getOne } = require("../helpers/sequelizeHelpers")
const { Product } = require('../../models/main');


UsersRoute.post('/products/:id', async (req, res) => {
  const productId = req.params.id;
try{
  getOne(Product ,productId)
  res.render("product_detail", {  page_title: "Product Details" });
}catch (error) {
  console.error(error);
  res.status(500).json({ message: 'Internal server error' });
}
  
  
  
});

module.exports = UsersRoute;
