const mysql = require("mysql2");

var connection = mysql.createConnection({
	host: "localhost",
	port: 3306,
	user: "root",
	password: "JLKIPOjlkipo809*",
	database: "tracker_db",
});

connection.connect(function (err) {
	if (err) throw err;
});

module.exports = connection;