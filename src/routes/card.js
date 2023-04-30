const { express } = require("../../index");
const UsersRoute = express.Router();
const { orders, orderitems,Product } = require('../../models/main');
const app = express();

// Define the GET route of the card page
UsersRoute.get('/', async (req, res) => {
   // Retrieve all order items from the database
   // get the id of the order with "not complete" status
   const USERId = 1;
   
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
         }).then( async orderItems => {
            const CardProucts = orderItems.map(item => {
               return {
                  productId: item.productId,
                  quantity: item.quantity,
                  price: item.price
               };
            });

            const products = await Product.findAll();
            var Allproducts = products.map(product => ({
               id: product.id,
               name: product.name,
               price: product.price,
               description: product.description,
               image: product.image
            }));

            res.render('card', { page_title: "Card", CardProucts , Allproducts });
         });
      } else {
         console.log("Card is Empty")
         res.status(401).send('<script>alert("Card is empty, Please go to product page to add product.");location.href="/products"</script>');
      }
   });
});

// Define the POST route for deleting the item from the order items table
UsersRoute.delete('/:id', async (req, res) => {
   // Extract the id from the parameters sent in the request
   const id = req.params.id;

   // Search for the item to be deleted using the id
   const orderItem = await orderitems.findOne({where: { productId: id }});

   // delete the item if it exists
   if (orderItem) {
      await orderItem.destroy();
   }
   res.status(204).send(`<script>alert("Deleted")</script>`);
});

module.exports = UsersRoute;