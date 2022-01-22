const { Router } = require("express");
//const { route } = require("./app");
//const { mostrar } = require("./controllers/agenda");
const agenda = require('./controllers/agenda');
const time = require('./config/dataHora');
const conexao = require("./conexao");

function validarLogin(req, res, next) {
    console.log(time(), "Validando Login");
    const usuario = req.body.usuario;
    const senha = req.body.senha;
    const sql = `SELECT * FROM usuario WHERE nome = '${usuario}' AND senha = '${senha}';`;

    conexao.query(sql, function (err, result, fields) {
        if (err) {
            console.log(time(), "Erro ao bucar no BD");
            return res.status(200).json({
                error: true,
                code: 404,
                msg: "Erro ao Buscar no Banco de Dados",
                err: err
            });
        } else {
            const resposta = JSON.parse(JSON.stringify(result));
            //console.log(time(),resposta[0]);

            if (resposta.length === 0) {
                console.log(time(), "Login Invalido");
                return res.status(200).json({
                    error: "true",
                    code: 401,
                    msg: "Usuário ou senha inválidos"
                });
            } else if (resposta.length === 1) {
                console.log(time(), "Login OK");
                return res.status(200).json({
                    error: "false",
                    code: 200,
                    msg: "LOGIN OK",
                    resposta: resposta[0]
                });
            };

        };
    });

};
const routes = new Router();



//listar
routes.get('/listar_agenda', agenda.listar);
//mostrar
routes.get('/mostrar_agenda/:id', agenda.mostrar);
//cadastrar
routes.post('/cadastra_evento', agenda.cadastrar);
//Deletar
routes.delete('/deletar_agenda/:id', agenda.deletar);
//login
routes.post('/login', validarLogin)
module.exports = routes;