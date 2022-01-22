const login = sessionStorage.login;
const ip = sessionStorage.ip;
const user = sessionStorage.user;
if (login != 'OK') {

    setTimeout(function () {
        location.replace("index.html");
    }, 0500);
} else {
    function listar(req, res) {
        axios.get(`${ip}listar_agenda`)
            .then(function (response) {
                //console.log(response)
                //console.log(response.data)
                //console.log(response.data.result)
                let tabela = ""
                for (let index = 0; index < response.data.result.length; index++) {
                    tabela = tabela + ` <tr>
                                            <th scope="row">${response.data.result[index].data}</th>
                                            <td>${response.data.result[index].nome}</td>
                                           <td><button type="button" class="btn btn-danger" onclick="deletar(${response.data.result[index].id})">Deletar</button></td> 
                                        </tr>`
                }
                document.getElementById('bodyTabela').innerHTML = tabela
            }).catch(function (error) {
                console.log(error)
            });
    };
    listar();
}

function cadastrar(req, res) {
    let cadnome = document.getElementById('text').value;
    let datahr = document.getElementById('datahr').value;
    if (cadnome == '' || datahr == '') {
        Swal.fire(
            'Espaço Imcompleto',
            'Todos o espaços devem esta completos',
            'question'
        )
    } else {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'btn btn-success',
                cancelButton: 'btn btn-danger'
            },
            buttonsStyling: false
        })

        swalWithBootstrapButtons.fire({
            title: 'Você deseja cancelar?',
            text: "",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {

                axios.post(`${ip}cadastra_evento`, {
                    nome: `${cadnome}`,
                    data_hora: `${datahr}`
                }).then(function (response) {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Evento Cadastrado',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    setTimeout(() => {
                        location.reload();
                    }, 1600);

                })
                    .catch(function (error) { console.error(error) });
            } else if (
                /* Read more about handling dismissals below */
                result.dismiss === Swal.DismissReason.cancel
            ) {
                swalWithBootstrapButtons.fire(
                    'Cancelado',
                    '',
                    'error'
                )
            }
        })

    }

};

function deletar(id) {
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
        title: 'Você deseja cancelar?',
        text: "",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {

            axios.delete(`${ip}deletar_agenda/${id}`)
                .then(function (response) {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Evento deletado',
                        showConfirmButton: false,
                        timer: 1500
                    });
                    setTimeout(() => {
                        location.reload();
                    }, 1600);
                }).catch(function (error) {
                    console.error(error)
                });

        } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
        ) {
            swalWithBootstrapButtons.fire(
                'Cancelado',
                '',
                'error'
            )
        }
    })



};

document.getElementById('cadastrar').addEventListener('click', cadastrar);
