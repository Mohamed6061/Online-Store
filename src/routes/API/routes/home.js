const { express } = require("../../../../index");
const productAPIRouter = express.Router();
const { getAll  } = require('../../../helpers/sequelizeHelpers');
const {Product} = require('../../../../models/main');

productAPIRouter.get("/", async (req, res) => {
        try {
                const allproducts = await getAll(Product);
                res.send(allproducts);
        } catch (error) {
                console.error(error.message);
        }
});

module.exports = productAPIRouter;
