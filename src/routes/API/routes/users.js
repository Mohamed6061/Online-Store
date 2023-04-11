const { express } = require("../../../../index");
const poolPromised = require("../../../../sequelize")
const userAPIRouter = express.Router();
const { query_runner, query_error } = require("../../../helpers/mysql_helpers");

userAPIRouter.get("/", (req, res) => {
        // query_runner("SELECT * FROM author")
        //         .then(([rows]) => res.json(rows))
        //         .catch((err) => res.json(query_error(err.message)));
});

module.exports = userAPIRouter;

// usersAPIRouter.post("/", (req, res) => {

//         const { id, name, email, age, role } = req.body;
//         const sql = `INSERT INTO author (id, username, email, age, role) VALUES (?, ?, ?, ?, ?)`;

//         poolPromised.query(sql, [id, name, email, age, role], (err, result) => {
//                 if (err) {
//                         reject(err);
//                 } else {
//                         resolve(result);
//                 }
//         })
//                 .then(() => {
//                         res.send('<script>alert("User added successfully"); window.location.href="/users";</script>');
//                 })
//                 .catch((error) => {
//                         console.log(error);
//                         res.send(`<script>alert("Error adding user ${name}! Username or email is already exit"); window.location.href="/users";</script>`);
//                 });

// });

// usersAPIRouter.delete("/:id", (req, res) => {
//         query_runner("DELETE FROM author WHERE id = ?", [req.params.id])
//                 .then(([{ affectedRows }]) => {
//                         return ((affectedRows > 0)
//                                 ? res.json({ error: 0, status: 200, msg: "user deleted successfullty" })
//                                 : res.json({ error: 0, status: 404, msg: "can't find user with id: " + req.params.id }))
//                 })
//                 .catch((err) => res.json(query_error(err.message)));
// });

// module.exports = usersAPIRouter;
