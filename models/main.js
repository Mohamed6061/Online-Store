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
        type: DataTypes.STRING(150),
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
    orderId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'orders',
            key: 'id'
        }
    },
    productId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'products',
            key: 'id'
        }
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
    userId: { 
        type: DataTypes.INTEGER
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


module.exports = {User , Product , orders , orderitems};