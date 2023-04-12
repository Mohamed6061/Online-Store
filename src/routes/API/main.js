const { express } = require("../../../index");
const APIRouter = express.Router();
const usersAPIRouter = require("./routes/users");
const productsAPIRouter = require("./routes/products");
const product_detailsAPIRouter = require("./routes/product_details");
const homeAPIRouter = require("./routes/home");
const checkoutAPIRouter = require("./routes/checkout");
const cardAPIRouter = require("./routes/card");


APIRouter.use("/users", usersAPIRouter);
APIRouter.use("/products", productsAPIRouter);
APIRouter.use("/product_details", product_detailsAPIRouter);
APIRouter.use("/home", homeAPIRouter);
APIRouter.use("/checkout", checkoutAPIRouter);
APIRouter.use("/card", cardAPIRouter);

APIRouter.get("/", (req, res) => {
        res.status(200).json({
                "status": 200,
                "error": 0,
                "Usage": "Use /users or /posts to get data from our api",
        })
});


module.exports = APIRouter;
