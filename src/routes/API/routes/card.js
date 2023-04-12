const { express } = require("../../../../index");
const productAPIRouter = express.Router();
const { getAll  } = require('../../../helpers/sequelizeHelpers');
const {orderitems} = require('../../../../models/main');

productAPIRouter.get("/", async (req, res) => {
        try {
                const allproducts = await getAll(orderitems);
                res.send(allproducts);
        } catch (error) {
                console.error(error.message);
        }
});

module.exports = productAPIRouter;
