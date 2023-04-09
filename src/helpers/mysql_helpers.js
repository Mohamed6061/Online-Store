const con = require("../../mysql");


module.exports = {
        query_runner(sql, data = []) {
                if (data.length > 0) {
                        var q = con.query(sql, data);
                } else {
                        var q = con.query(sql);
                }
                return q;
        },

        query_error(msg) {
                return {
                        error: msg,
                        status: 500,
                        err_code: "db_err"
                };
        }
}