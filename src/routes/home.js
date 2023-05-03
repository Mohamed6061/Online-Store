const { express } = require("../../index");
const UsersRoute = express.Router();

// UsersRoute.get("/", (req, res) => {
//         res.render("home", {  page_title: "Home" });
// });

// const express = require('express');
const Sequelize = require('sequelize');
const sequelize = new Sequelize('database_name', 'username', 'password', {
host: 'localhost',
dialect: 'mysql'
});

const Product = sequelize.define('Product', {
        name: {
        type: Sequelize.STRING,
        allowNull: false
},
        description: {
        type: Sequelize.STRING,
        allowNull: false
},
        price: {
        type: Sequelize.FLOAT,
        allowNull: false
}
});



UsersRoute.get("/", (req, res) => {
        Product.findAll().then(products => {
        const data = products.map(product => {
                return {
                name: product.name,
                description: product.description,
                price: product.price
};
});
console.log(data)
res.render("home", { page_title: "Home" });
});
});
module.exports = UsersRoute;
