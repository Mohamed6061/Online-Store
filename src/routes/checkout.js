const { express } = require("../../index");
const UsersRoute = express.Router();
const { orders, orderitems, Product } = require("../../models/main");

UsersRoute.get("/", async (req, res) => {
  const USERId = 1;

  const order = await orders.findOne(
    { where: { status: 'Not Complete', userId: USERId } });

  if (order) {
    const orderI = await orderitems.findAll({
      where: { orderId: order.id },
    });
    var orderitem = orderI.map(OI => ({
      productId: OI.productId,
      quantity: OI.quantity,
      price: OI.price
    }));

    const allProducts = await Product.findAll();
    var products = allProducts.map(product => ({
      id: product.id,
      name: product.name,
      price: product.price,
      description: product.description,
      image: product.image
    }));
    
    res.render("checkout", { page_title: "Checkout", orderitem, products, id: order.id });
  } else {
    console.log("There is no orders")
    res.render("checkout", { page_title: "Checkout" });
  }
});

UsersRoute.post("/:id", async (req, res) => {
  const orderId = req.params.id;
  try {
    const order = await orders.findByPk(orderId);
    order.update({ status: "Complete" });

    res.status(204).send(`<script>alert("Process is done suecessfully.")</script>`);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
})
module.exports = UsersRoute;
