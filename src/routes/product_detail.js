const { express } = require("../../index");
const UsersRoute = express.Router();
const { Product } = require('../../models/main');

UsersRoute.get('/:id', async (req, res) => {
  const id = req.params.id;

  // Find the product with the provided id
  const product = await Product.findByPk(id);
  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }
  // Product found
  res.render("product_detail", { product , page_title: product.name });
  // res.status(200).json(product.toJSON());
});

UsersRoute.post("/", async (req, res) => {
   try {
      const USERId = req.session.userInfo.id;
      const product = await Product.findOne({ where: { id: req.body.id } });

      const incompleteOrder = await orders.findOne({
         where: { status: 'Not Complete', userId: USERId }
      });

      if (incompleteOrder) {
         var incompleteOrderId = incompleteOrder.id;
      } else {
         const newOrder = await orders.create({
            status: "Not Complete",
            userId: USERId
         })
         var incompleteOrderId = newOrder.id;
      }

      orderitems.create({
         quantity: req.body.quantity[1],
         price: product.price,
         orderId: incompleteOrderId,
         productId: product.id
      })

   } catch (e) {
      console.log("error here", e)
   }
})

module.exports = UsersRoute;
