function obterIdDaURL() {
    var params = new URLSearchParams(window.location.search);
    return params.get("id");
}

function preencherFormulario(endereco) {
    document.getElementById("titulo").value = endereco.title || "";
    document.getElementById("cep").value = endereco.cep || "";
    document.getElementById("endereco").value = endereco.address || "";
    document.getElementById("numero").value = endereco.number || "";
    document.getElementById("complemento").value = endereco.complement || "";
}

function buscarEnderecoPorId(id) {
    var tokenData = JSON.parse(localStorage.getItem("user"));
    var token = tokenData?.access_token;

    fetch("https://go-wash-api.onrender.com/api/auth/address/" + id, {
        method: "GET",
        headers: {
            "Authorization": "Bearer " + token
        }
    })
        .then(function (resposta) {
            if (!resposta.ok) throw new Error("Erro ao buscar endereço.");
            return resposta.json();
        })
        .then(function (dados) {
            preencherFormulario(dados);
        })
        .catch(function (erro) {
            alert("Erro ao carregar dados do endereço.");
            console.error(erro);
        });
}

function atualizarEndereco(id, dadosAtualizados) {
    var tokenData = JSON.parse(localStorage.getItem("user"));
    var token = tokenData?.access_token;

    fetch("https://go-wash-api.onrender.com/api/auth/address/" + id, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        },
        body: JSON.stringify(dadosAtualizados)
    })
        .then(function (resposta) {
            if (!resposta.ok) throw new Error("Erro ao atualizar endereço.");
            alert("Endereço atualizado com sucesso!");
            window.location.href = "listagem.html";
        })
        .catch(function (erro) {
            alert("Erro ao atualizar o endereço.");
            console.error(erro);
        });
}

document.getElementById("form-endereco").addEventListener("submit", function (event) {
    event.preventDefault();

    var id = obterIdDaURL();
    var dadosAtualizados = {
        title: document.getElementById("titulo").value,
        cep: document.getElementById("cep").value,
        address: document.getElementById("endereco").value,
        number: document.getElementById("numero").value,
        complement: document.getElementById("complemento").value
    };

    atualizarEndereco(id, dadosAtualizados);
});

var id = obterIdDaURL();
if (id) {
    buscarEnderecoPorId(id);
} else {
    alert("ID do endereço não encontrado.");
    window.location.href = "listagem.html";
}
