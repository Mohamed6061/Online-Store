const { express } = require("../../index");
const UsersRoute = express.Router();
const {Product} = require("../../models/main")

UsersRoute.get("/", (req, res) => {
        Product.findAll().then(products => {
                console.log(" : ")
                console.log(products)
                const data = products.map(product => {
                        return {
                                id : product.id,
                                name: product.name,
                                description: product.description,
                                price: product.price,
                                image : product.image
                        };
                });
                console.log(data)
                res.render("home", { products : data ,  page_title: "Home" });
        });
});

module.exports = UsersRoute;
