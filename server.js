const app = require('./app');
const conexao = require('./conexao');
const temp = require('./config/dataHora')

conexao.connect(function (err) {
    if (err) {
        console.log("Erro ao Conectar no Banco de Dados!");
        console.log(err);
    } else {
        console.log("Conectado no Banco de Dados!");
    }
});
app.listen(8000, () => {
    console.log("Servidor iniciado na porta 0800");
});