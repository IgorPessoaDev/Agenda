const bancoDados = require('mysql');

module.exports = bancoDados.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "agenda" // o nome no banco de pode ser diferente 
});