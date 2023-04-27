const { express } = require("../../index");
const UsersRoute = express.Router();
const { Product } = require('../../models/main');

UsersRoute.get('/', async (req, res) => {
  res.render("product_detail", {  page_title: "Product Details" });
});

UsersRoute.post('/products/:id', async (req, res) => {
  const productId = req.params.id;
  res.render("product_detail", {  page_title: "Product Details" });
});

module.exports = UsersRoute;
