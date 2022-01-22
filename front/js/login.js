sessionStorage.ip = "http://localhost:8000/";
function login() {
    const ip = sessionStorage.ip;
    const login = document.getElementById('usuario').value;
    const password = document.getElementById('senha').value;

    if (usuario == '' || senha == '') {
        document.getElementById('msg').innerHTML = 'Preencha os campos.';
        swal("Aviso!", "Preencha os campos!", "info");

    } else {
        axios.post(`${ip}login`, {
            usuario: login,
            senha: password
        }).then(function (response) {
            console.log(response.data);
            // console.log(response.data.error)
            if (response.data.error == 'true') {
                document.getElementById('msg').innerHTML = response.data.msg;
                sessionStorage.login = 'NOT';
                swal("Erro!", "Dados inválidos!", "error");
            } else {
                $.notify(`Bem- Vindo ${login}`, "success");
                sessionStorage.login = 'OK';
                sessionStorage.user = login;
                document.getElementById('msg').innerHTML = response.data.msg;
                setTimeout(function () { // delay de 1 segundo
                    // console.log('foi pra lista')
                    location.replace("lista.html");
                }, 2000);
            }

        }).catch(function (error) {
            console.log(error);
            document.getElementById('msg').innerHTML = error.data.msg;
        }
        );
    };

};

//document.getElementById('log').addEventListener('click',login);