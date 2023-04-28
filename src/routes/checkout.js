const { express } = require("../../index");
const UsersRoute = express.Router();
const { orders, orderitems, User } = require("../../models/main");

UsersRoute.get("/", (req, res) => {
  // we still have no user so we can here  imagine we have a user to get data of tabeles associate with user

  try {
    const userId = 1;
    const orders = orders.findAll({
      where: { userId: userId },
    });
    const ordersId = orders.id;
    const order_item = orderitems.findAll({
      where: { ordersId },
    });
    console.log()
    res.render("checkout", { page_title: "Checkout", id: ordersId, order_item });
  } catch (err) {
    console.log(err);
  }
});


UsersRoute.post("/", (req, res) => {
  const orderId = req.body
  // find order
  try {
    const order = orders.findOne({
      where: { orderId },
    })
    order.status = true

  } catch (err) {
    console.log(err)
  }


})
module.exports = UsersRoute;
