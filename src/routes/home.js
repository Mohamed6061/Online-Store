const { express } = require("../../index");
const UsersRoute = express.Router();
const { Product } = require("../../models/main")

UsersRoute.get("/", (req, res) => {
    if (req.session && req.session.userInfo) {
        Product.findAll().then(products => {
            const data = products.map(product => {
                return {
                    id: product.id,
                    name: product.name,
                    description: product.description,
                    price: product.price,
                    image: product.image
                };
            });
            // console.log(data)
            res.render("home", { products: data, page_title: "Home" });
        });
    } else {
        res.redirect('/login');
    }
});

module.exports = UsersRoute;
