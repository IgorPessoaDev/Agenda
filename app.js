const express = require("express");
const cors = require('cors');
const routes = require('./routes');
const app = express();
/*app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    app.use('cors');
    next()
})*/
class App {
    constructor() {
        this.app = express();
        this.middlewares();
        this.routes();
    }
    middlewares() {
        this.app.use(express.json());
        this.app.use(cors());
    }
    routes() {
        this.app.use(routes);
    }
}
module.exports = new App().app;