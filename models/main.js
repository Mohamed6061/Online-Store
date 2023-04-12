const sequelize = require("../sequelize")
const { DataTypes } = require('sequelize');
// const Order = require("./order")

// Define the User model
const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING(50),
        allowNull: false
    }
}, {
    timestamps: false,
    tableName: "Users"
});

User.sync({ alter: true }) // creates the table if it doesn't exist
    .then(() => {
        console.log('User table created');
    })
    .catch((error) => {
        console.error('Error creating User table:', error);
    });

// User.hasMany(Order);
/////////////////////

// Define the Product model
const Product = sequelize.define('Product', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    image: {
        type: DataTypes.STRING(200),
        allowNull: true
    }
}, {
    timestamps: false,
    tableName: "products"
});

Product.sync({ alter: true }) // creates the table if it doesn't exist
    .then(() => {
        console.log('Product table created');
    })
    .catch((error) => {
        console.error('Error creating Product table:', error);
    });

////////
const orderitems = sequelize.define('orderitems', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    }
}, {
    timestamps: false,
    tableName: "orderitems"
});
orderitems.sync({ alter: true }) // creates the table if it doesn't exist
    .then(() => {
        console.log('orderitems table created');
    })
    .catch((error) => {
        console.error('Error creating orderitems table:', error);
    });

/////
const orders = sequelize.define('orders', {
    id: { 
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true 
    },
    status: {
        type: DataTypes.STRING(20),
        allowNull: false
    }
}, {
    timestamps: false,
    tableName: "orders"
});
orders.sync({ alter: true }) // creates the table if it doesn't exist
    .then(() => {
        console.log('orders table created');
    })
    .catch((error) => {
        console.error('Error creating orders table:', error);
    });


User.hasMany(orders);
orders.belongsTo(User);
Product.hasMany(orderitems);
orderitems.belongsTo(Product);
orders.hasMany(orderitems);
orderitems.belongsTo(orders);

// User.create({
//     name: 'm0000',
//     email: 'moe00@example.com',
//     password: 'mypassword'
// })
// Product.create({
//     name: 'Product Five',
//     description : "Nulla facilisi. Nullam vel dolor ultrices, malesuada nisi eu, bibendum purus. Sed mollis in magna vel auctor. Sed euismod, eros a porttitor hendrerit, lectus purus ullamcorper sapien",
//     price : 7655.53,
//     image : "https://images.pexels.com/photos/341523/pexels-photo-341523.jpeg?auto=compress&cs=tinysrgb&w=600"
// })
// orderitems.create({
//     quantity: 77,
//     price : 54.42
// })
// orders.create({
//     status : "No order"
// })
// User.create({
//     name: 'm000',
//     email: 'moe0@example.com',
//     password: '1234'
// })
// Product.create({
//     name: 'Product Five',
//     description : "Nulla facilisi. Nullam vel dolor ultrices, malesuada nisi eu, bibendum purus. Sed mollis in magna vel auctor. Sed euismod, eros a porttitor hendrerit, lectus purus ullamcorper sapien",
//     price : 323.53,
//     image : "https://images.pexels.com/photos/341523/pexels-photo-341523.jpeg?auto=compress&cs=tinysrgb&w=600"
// })
// orderitems.create({
//     quantity: 77,
//     price : 54.42
// })
// orders.create({
//     status : "No order"
// })
module.exports = {User , Product , orders , orderitems};