const { express } = require("../../index");
const UsersRoute = express.Router();
const { create } = require("../helpers/sequelizeHelpers")
const { User } = require('../../models/main');

UsersRoute.get("/", async (req, res) => {
    res.render("users", { page_title: "Dashboard" });
});

// allmost Finished 
UsersRoute.post('/', (req, res) => {
    const data = req.body;
    console.log(data)
    User.findOne({ where: { email: data.email } })
        .then( user => {
            if (user) {
                console.log('User found:');
                res.send(`<script>alert("Error adding user ${data.name}! Username or email is already exit"); window.location.href="/login";</script>`);
            } else {
                create(User ,data)
                res.render("users", { page_title: "Dashboard" });
            }
        })
        .catch(error => {
            console.error('Error finding user:', error);
            res.status(500).send('Error finding user');
        });
});

module.exports = UsersRoute;