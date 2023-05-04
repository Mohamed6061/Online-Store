const { express } = require("../../index");
const UsersRoute = express.Router();
const { Product, orders, orderitems } = require('../../models/main');

UsersRoute.get('/:id', async (req, res) => {
   if (req.session && req.session.userInfo) {
      const id = req.params.id;
      const product = await Product.findByPk(id);
      if (!product) {
         return res.status(404).json({ error: 'Product not found' });
      }
      // Product found
      res.render("product_detail", { product, page_title: product.name });
   } else {
      res.redirect('/login');
   }
});

UsersRoute.post("/", async (req, res) => {
   try {
      const USERId =req.session.userInfo.id;
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
         quantity: req.body.quantity,
         price: product.price,
         orderId: incompleteOrderId,
         productId: product.id
      })
      res.send(`<script>alert("Product has been added successfully"); location.href = "/products" </script>`)
   } catch (e) {
      console.log("error here", e)
   }
})

module.exports = UsersRoute;
