const { express } = require("../../index");
const productAPIRouter = express.Router();
const { Product } = require('../../models/main');
const { getAll ,create } = require("../../src/helpers/sequelizeHelpers");

productAPIRouter.get("/", async (req, res) => {
    if (req.session && req.session.userInfo) {
        try {
            const allProducts = await getAll(Product);

            var products = allProducts.map(product => ({
                id: product.id,
                name: product.name,
                price: product.price,
                description: product.description,
                Image: product.image
            })
            )
            res.render("products", { products, page_title: "Products" , role : req.session.userInfo.role });
        } catch (error) {
            console.error(error.message);
        }
    } else {
        res.redirect('/login');
    }
});

productAPIRouter.post("/add", async (req, res) => {
    try {
        const { name, description, price, image } = req.body;
        const newProduct = await create(Product, { name, description, price, image });
        res.status(201).redirect("/products")
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});

productAPIRouter.delete("/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const product = await Product.findOne({ where: { id: id } });
        if (!product) {
            return res.status(404).json({ error: "product not found" });
        }
        await product.destroy();
        return res.status(200).json({ success: "Product deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: "Internal server error" });
    }
}); 


module.exports = productAPIRouter;