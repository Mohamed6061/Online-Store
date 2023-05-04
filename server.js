const express = require("express")
const { app } = require("./index");
const bodyParser = require("body-parser");
const multer = require("multer");
const path = require("path");
const UsersRoute = require("./src/routes/users");
const signupRoute = require("./src/routes/signup");
const productsRoute = require("./src/routes/products");
const product_detailRoute = require("./src/routes/product_detail");
const {loginRoute} = require("./src/routes/login");
const homeRoute = require("./src/routes/home");
const checkoutRoute = require("./src/routes/checkout");
const cardRoute = require("./src/routes/cart");
const APIRouter = require("./src/routes/API/main");
const session = require('express-session');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(multer().array());
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

app.use(express.static(path.join(__dirname, "public")));

app.use("/users", UsersRoute);
app.use("/signup", signupRoute);
app.use("/products", productsRoute);
app.use("/product_details", product_detailRoute);
app.use("/login", loginRoute);
app.use("/home", homeRoute);
app.use("/", homeRoute);
app.use("/checkout", checkoutRoute);
app.use("/cart", cardRoute);
app.use("/api", APIRouter);

app.get("*", (req, res) => {
        res.status(404).render("notFound" , {page_title : "Not Found"})
});

app.set("view engine", 'ejs');
app.set("views", path.join(__dirname, 'views'));
