// Finished File Don't edite!
const { express } = require("../../index");
const productAPIRouter = express.Router();
const { Product } = require('../../models/main');

productAPIRouter.get("/", async (req, res) => {
    try {
        const allProducts = await getAll(Product);
        var products = allProducts.map(product => ({
        id : product.id,
        name: product.name,
        price: product.price,
        description: product.description,
        Image: product.image
    })
    )
    res.render("products", {products, page_title: "Products" });
    } catch (error) {
    console.error(error.message);
    }
});

productAPIRouter.post("/",  async (req, res) => {
    try {
            const { name, description, price, image } = req.body;
            const newProduct = await create(Product, { name, description, price, image });
            res.status(201).send(newProduct);
    } catch (error) {
            console.error(error.message);
            res.status(500).send("Server Error");
    }
});

module.exports = productAPIRouter;