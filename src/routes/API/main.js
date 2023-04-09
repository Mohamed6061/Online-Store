const { express } = require("../../../index");
const APIRouter = express.Router();
const usersAPIRouter = require("./routes/users");
const signupAPIRouter = require("./routes/signup");
const productsAPIRouter = require("./routes/products");
const product_detailsAPIRouter = require("./routes/product_details");
const loginAPIRouter = require("./routes/login");
const homeAPIRouter = require("./routes/home");
const chectoutAPIRouter = require("./routes/chectout");
const cardAPIRouter = require("./routes/card");


APIRouter.use("/users", usersAPIRouter);
APIRouter.use("/signup", signupAPIRouter);
APIRouter.use("/products", productsAPIRouter);
APIRouter.use("/product_details", product_detailsAPIRouter);
APIRouter.use("/login", loginAPIRouter);
APIRouter.use("/home", homeAPIRouter);
APIRouter.use("/chectout", chectoutAPIRouter);
APIRouter.use("/card", cardAPIRouter);

APIRouter.get("/", (req, res) => {
        res.status(200).json({
                "status": 200,
                "error": 0,
                "Usage": "Use /users or /posts to get data from our api",
        })
});


module.exports = APIRouter;
