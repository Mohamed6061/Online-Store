const mysql2 = require("mysql2");

const poolC = mysql2.createPool({
        port: 3306,
        host: 'localhost',
        database: 'sblog',
        user: 'root',
        password: ''
});

const poolPromised = poolC.promise();

module.exports = poolPromised;
