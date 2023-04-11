const Sequelize = require('sequelize');

const sequelize = new Sequelize('online_store', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false
});

// connect to database
sequelize.authenticate()
    .then(() => {
        console.log('Connection to database has been established successfully.');
    })
    .catch((error) => {
        console.error('Unable to connect to the database:', error);
    });

module.exports = sequelize;

require("./models/main")
// const User =require("./models/user")
// const Order =require("./models/product")
// const Product =require("./models/order")
// const OrderItem =require("./models/orderitems")

// User.hasMany(Order);
// Order.belongsTo(User);
// Product.hasMany(OrderItem);
// OrderItem.belongsTo(Product);
// Order.hasMany(OrderItem);
// OrderItem.belongsTo(Order);

// Product.create({
//     name: 'new',
//     price : 122.42
// })

// OrderItem.belongsTo(Order);
// Order.hasMany(OrderItem);

// OrderItem.belongsTo(Product);
// Product.hasMany(OrderItem);