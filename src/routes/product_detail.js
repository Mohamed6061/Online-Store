const { express } = require("../../index");
const UsersRoute = express.Router();
const { Product } = require('../../models/main');

UsersRoute.get('/', async (req, res) => {
  res.render("product_detail", {  page_title: "Product Details" });
});


UsersRoute.post('/products/:id', async (req, res) => {
  const id = req.params.id;

  // Find the product with the provided id
  const product = await Product.findByPk({id});
  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }

  // Product found
  res.render("product_detail", { product , page_title: "Product Details" });
  res.status(200).json(product.toJSON());
});

module.exports = UsersRoute;
