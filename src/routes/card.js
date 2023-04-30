const { express } = require("../../index");
const UsersRoute = express.Router();
const app = express();


UsersRoute.get("/" , (req, res) => {
   res.render("card", { page_title: "Card"});
});

// const express = require('express');
// const Sequelize = require('sequelize');

// const app = express();
// const port = 5050;

// Configure the sequelize connection to the database
// const sequelize = new Sequelize('database_name', 'username', 'password', {
//     host: 'localhost',
//     dialect: 'mysql' 
// });

// Define the OrderItem model using sequelize
// const OrderItem = sequelize.define('orderItem', {
//     name: {
//     type: Sequelize.STRING,
//     allowNull: false
// },
//     price: {
//     type: Sequelize.FLOAT,
//     allowNull: false
// }
// });

// Define the GET route of the card page
app.get('/card', async (req, res) => {
// Retrieve all order items from the database
    // const orderItems = await OrderItem.findAll();

   
   
   const OrderItem = sequelize.define('OrderItem', {
      name: {
      type: Sequelize.STRING,
      allowNull: false
   },
      price: {
      type: Sequelize.FLOAT,
      allowNull: false
   }
   });
   
   const Order = sequelize.define('Order', {
      status: {
      type: Sequelize.STRING,
      allowNull: false
   }
   });
   
   Order.hasMany(OrderItem);
   OrderItem.belongsTo(Order);
   
    // get the id of the order with "not complete" status
   Order.findOne({
      where: {
      status: 'not complete'
   }
   }).then(order => {
   
   const orderId = order.id;
   
      // Get products for the specified order
      
   OrderItem.findAll({
      where: {
      orderId: orderId
      }
   }).then(orderItems => {
      const products = orderItems.map(item => {
      
      return {
      
            price: item.price
      };
      });
   
      console.log(products);
   });
   });
   
// Display the card page with orderItems
   res.render('card', { orderItems });
});

// Define the POST route for deleting the item from the order items table
app.post('/delete-item/:id', async (req, res) => {
// Extract the id from the parameters sent in the request
   const id = req.params.id;

// Search for the item to be deleted using the id
   const orderItem = await OrderItem.findByPk(id);

// delete the item if it exists
   if (orderItem) {
      await orderItem.destroy();
}

// Redirect the user to the card page after deleting the item
   res.redirect('/card');
});

// app.listen(port, () => {
//     console.log(`Server is listening at http://localhost:${port}`);
// });
module.exports = UsersRoute;
