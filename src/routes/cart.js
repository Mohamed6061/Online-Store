const { express } = require("../../index");
const UsersRoute = express.Router();
const { orders, orderitems, Product } = require('../../models/main');
const app = express();

// Define the GET route of the card page
UsersRoute.get('/', async (req, res) => {
   if (req.session && req.session.userInfo) {
      // Retrieve all order items from the database
      // get the id of the order with "not complete" status
      const USERId = req.session.userInfo.id;

      orders.findOne({
         where: {
            status: 'Not Complete',
            userId: USERId
         }
      }).then(order => {
         if (order) {
            const orderId = order.id;
            // Get products for the specified order
            return orderitems.findAll({
               where: {
                  orderId: orderId
               }
            }).then(async orderItems => {
               const CartProudcts = orderItems.map(item => {
                  return {
                     productId: item.productId,
                     quantity: item.quantity,
                     price: item.price
                  };
               });

               // get all products
               const products = await Product.findAll();
               var Allproducts = products.map(product => ({
                  id: product.id,
                  name: product.name,
                  price: product.price,
                  description: product.description,
                  image: product.image
               }));

               res.render('cart', { page_title: "Cart", CartProudcts, Allproducts, status: true });
            });
         } else {
            res.render('cart', { page_title: "Cart", status: false });

         }
      });
   } else {
      // in case of not sign in
      res.redirect('/login');
   }
});

UsersRoute.delete('/:id', async (req, res) => {
   const id = req.params.id;
   try {
      const USERId = req.session.userInfo.id;

      // get order that not completed with user id that is sign in
      const order = await orders.findOne({
         where: {
            status: 'Not Complete',
            userId: USERId
         }
      });

      // Caheck if order not found
      if (!order) {
         return res.status(404).json({ error: "Order not found" });
      }

      // get all product in order that not complete
      const orderItem = await orderitems.findOne({ where: { productId: id , orderId : order.id} });
      if (!orderItem) {
         return res.status(404).json({ error: "Order item not found" });
      }

      // Delete orderitem
      await orderItem.destroy();
      res.sendStatus(204);
   } catch (err) {
      console.log("error here", err);
      res.status(500).json({ error: "Internal server error" });
   }
});

module.exports = UsersRoute;