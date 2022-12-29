const mysql = require("mysql");

const db = mysql.createConnection({
    host: "bddduxia.axial-host.net", 
    user: "u1_cFF4un0ypT",
    password: "vV0i5QW@n+feDPPk8cHX1GMC",
    database: "s1_akuno", 
});

module.exports = db;