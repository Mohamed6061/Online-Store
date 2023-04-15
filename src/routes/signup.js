// Finished File!
const { express } = require("../../index");
const UsersRoute = express.Router();
const { User } = require('../../models/main');
const {  create } = require('../../src/helpers/sequelizeHelpers');
const { Op } = require('sequelize');

UsersRoute.get("/", (req, res) => {
    res.render("login", { page_title: "SGIN UP | LOGIN IN" });
});

UsersRoute.post('/', (req, res) => {
    const data = req.body;
    console.log(data)
    User.findOne({ where: { 
        [Op.or]: [
            { email: data.email },
            { name: data.name }
        ]
    }})
        .then(user => {
            if (user) {
                console.log('User found:');
                res.send(`<script>alert("Error adding user ${data.name}! Email or Username already exists"); window.location.href="/login";</script>`);
            } else {
                create(User, data)
                res.send(`<script>alert("Added Successfully, Please SIGN IN"); window.location.href="/login";</script>`);
                // res.render("users", { page_title: "Dashboard" });
            }
        })
        .catch(error => {
            console.error('Error finding user:', error);
            res.status(500).send('Error finding user');
        });
});

module.exports = UsersRoute;
