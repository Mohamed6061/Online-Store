const { express } = require("../../index");
const UsersRoute = express.Router();
const { getAll } = require("../helpers/sequelizeHelpers")
const { User, orders, orderitems, Product } = require('../../models/main');
const bcrypt = require('bcrypt');


UsersRoute.get("/", async (req, res) => {
    if (req.session && req.session.userInfo) {
        try {
            let USERId = req.session.userInfo.id

            const user = await User.findOne({ where: { id: USERId } });
            const allorders = await orders.findAll({
                where: {
                    userId: USERId,
                    status: "Complete",
                }
            });
            var orderIds = allorders.map(o => (o.id));

            const allorederItems = await Promise.all(orderIds.map(async orderid => {
                let o = await orderitems.findAll({ where: { orderId: orderid } });
                var orders = o.map(product => ({
                    productId: product.productId,
                    quantity: product.quantity
                }));
                return orders;
            }));
            // console.log(allorders);

            let forders = allorederItems.filter(ele => ele.length !== 0);

            const allProducts = await getAll(Product);
            var products = allProducts.map(product => ({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image
            }))

            // to show all users
            const allUsers = await getAll(User);
            const users = allUsers.map(user => ({
                id: user.id,
                email: user.email,
                name: user.name,
                password: user.password,
                role: user.role
            }))
            // to add orders number to array if users
            let userInfoPromises = users.map(async user => {
                let numOrders = await orders.findAll({ where: { userId: user.id, status: "Complete" } })
                const or = numOrders.map(or => ({
                    id: or.id
                }))
                let openOrders = await orders.findAll({ where: { userId: user.id, status: "Not Complete" } })
                // console.log(openOrders)
                return ({
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    password: user.password,
                    role: user.role,
                    ordersNum: or.length,
                    openOrder : (openOrders.length !== 0) ? true : false
                })
            })
            let userInfo = await Promise.all(userInfoPromises)
            // console.log(forders);

            res.render("users", { page_title: "Account", user, allorders: forders, products, users : userInfo , role: req.session.userInfo.role });
        } catch (error) {
            console.error(error);
            res.status(500).send("Internal server error");
        }
    } else {
        res.redirect('/login');
    }
});


UsersRoute.post("/updateName", async (req, res) => {

    const { name } = req.body;
    try {
        let USERId = req.session.userInfo.id;
        await User.update({ name }, { where: { id: USERId } });

        res.send('<script>alert("Name updated successfully"); window.location.href = "/users";</script>');

    } catch (error) {
        console.log(error);
    }
})

UsersRoute.post("/updateEmail", async (req, res) => {

    const { email } = req.body;
    try {
        let USERId = req.session.userInfo.id
        await User.update({ email }, { where: { id: USERId } });
        res.send('<script>alert("Email updated successfully"); window.location.href = "/users";</script>');

    } catch (error) {
        console.log(error);
        res.redirect('/error');
    }
})

UsersRoute.post("/updatePassword", async (req, res) => {
    const saltRounds = 10;
    const { password } = req.body;
    try {
        let USERId = req.session.userInfo.id

        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(password, salt);
        await User.update({ password: hashedPassword }, { where: { id: USERId } });
        res.send('<script>alert("Password updated successfully"); window.location.href = "/users";</script>');
    } catch (error) {
        console.log(error);
        res.redirect('/error');
    }
});

// sign OUT
UsersRoute.get('/logout', (req, res) => {
    req.session.destroy((err) => {
            if (err) {
                    console.log(err);
            } else {
                    res.redirect('/login');
            }
    });
});
module.exports = UsersRoute;