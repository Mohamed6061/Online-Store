const { app } = require("./index");
const bodyParser = require("body-parser");
const multer = require("multer");
const path = require("path");
const UsersRoute = require("./src/routes/users");
const signupRoute = require("./src/routes/signup");
const productsRoute = require("./src/routes/products");
const product_detailRoute = require("./src/routes/product_detail");
const loginRoute = require("./src/routes/login");
const homeRoute = require("./src/routes/home");
const checkoutRoute = require("./src/routes/checkout");
const cardRoute = require("./src/routes/card");
const APIRouter = require("./src/routes/API/main");


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(multer().array());

app.use("/users", UsersRoute);
app.use("/signup", signupRoute);
app.use("/products", productsRoute);
app.use("/product_detail", product_detailRoute);
app.use("/login", loginRoute);
app.use("/home", homeRoute);
app.use("/checkout", checkoutRoute);
app.use("/card", cardRoute);
app.use("/api", APIRouter);

app.get("/", (req, res) => {
        res.render("home");
})

app.set("view engine", 'ejs');
app.set("views", path.join(__dirname, 'views'));
