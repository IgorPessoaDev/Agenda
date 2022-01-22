const conexao = require("../conexao");
class agenda {
    async listar(req, res) {
        const texto = "Listar agenda";
        console.log(`Acessou ${texto}`);
        let sql = `SELECT *, DATE_FORMAT(data_hora, '%d/%m/%Y %H:%i') as data FROM agenda`;

        await conexao.query(sql, function (err, result, statics) {
            if (err) {
                console.log(`Erro ao ${texto}`)
                console.log(err.sqlMessage)
                return res.status(500).json({
                    error: 'sim',
                    code: 500,
                    msg: `Erro ao ${texto}`,
                    msgError: err.sqlMessage
                });
            } else {
                var resposta = JSON.parse(JSON.stringify(result));
                console.log(`Sucesso ao ${texto}`)
                return res.status(200).json({
                    error: 'nao',
                    code: 200,
                    msg: `Sucesso ao ${texto}`,
                    result: resposta
                });
            }
        })
    };

    async mostrar(req, res) {
        const texto = "mostrar agenda";
        console.log(`Acessou ${texto}`);
        //console.log(req);
        //console.log(req.params);
        const id = req.params.id;
        const sql = `SELECT * FROM agenda WHERE id= '${id}'`;
        await conexao.query(sql, function (err, result, statics) {
            if (err) {
                console.log(`Erro ao ${texto}`)
                console.log(err.sqlMessage)
                return res.status(500).json({
                    error: 'sim',
                    code: 500,
                    msg: `Erro ao ${texto}`,
                    msgError: err.sqlMessage
                });
            } else {
                var resposta = JSON.parse(JSON.stringify(result));
                console.log(`Sucesso ao ${texto}`)
                return res.status(200).json({
                    error: 'nao',
                    code: 200,
                    msg: `Sucesso ao ${texto}`,
                    result: resposta
                });
            }
        })
    };

    async cadastrar(req, res) {
        const texto = "cadastrar agenda";
        console.log(`Acessou ${texto}`);
        let nome = req.body.nome;
        let data_hora = req.body.data_hora;
        const sql = `INSERT INTO agenda (nome, data_hora)
        VALUES ('${nome}', '${data_hora}');
        `;
        await conexao.query(sql, function (err, result, statics) {
            if (err) {
                console.log(`Erro ao ${texto}`)
                console.log(err.sqlMessage)
                return res.status(500).json({
                    error: 'sim',
                    code: 500,
                    msg: `Erro ao ${texto}`,
                    msgError: err.sqlMessage
                });
            } else {
                var resposta = JSON.parse(JSON.stringify(result));
                console.log(`Sucesso ao ${texto}`)
                return res.status(200).json({
                    error: 'nao',
                    code: 200,
                    msg: `Sucesso ao ${texto}`,
                    result: resposta
                });
            }
        })
    };

    async deletar(req, res) {
        const texto = "deletar agenda";
        console.log(`Acessou ${texto}`);
        const id = req.params.id;
        const sql = `DELETE FROM agenda WHERE id = ${id}`
        await conexao.query(sql, function (err, result, statics) {
            if (err) {
                console.log(`Erro ao ${texto}`)
                console.log(err.sqlMessage)
                return res.status(500).json({
                    error: 'sim',
                    code: 500,
                    msg: `Erro ao ${texto}`,
                    msgError: err.sqlMessage
                });
            } else {
                var resposta = JSON.parse(JSON.stringify(result));
                console.log(`Sucesso ao ${texto}`)
                return res.status(200).json({
                    error: 'nao',
                    code: 200,
                    msg: `Sucesso ao ${texto}`,
                    result: resposta
                });
            }
        })
    }
}
module.exports = new agenda();