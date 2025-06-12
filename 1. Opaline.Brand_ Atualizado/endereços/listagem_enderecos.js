let enderecoAtualId = null;

async function buscarEnderecos() {
    const tokenData = JSON.parse(localStorage.getItem("user"));
    const token = tokenData?.access_token;

    if (!token) {
        alert("Token inválido. Faça login novamente.");
        window.location.href = "../login/login.html";
        return;
    }

    const tabela = document.getElementById("tabela-enderecos");
    const template = document.getElementById("template-linha");
    tabela.innerHTML = "";

    try {
        const resposta = await fetch("https://go-wash-api.onrender.com/api/auth/address", {
            headers: { "Authorization": `Bearer ${token}` }
        });

        const dados = await resposta.json();
        const enderecos = Array.isArray(dados) ? dados : dados.data || [];

        if (enderecos.length === 0) {
            tabela.innerHTML = "<tr><td colspan='5'>Nenhum endereço cadastrado.</td></tr>";
            return;
        }

        enderecos.forEach((item) => {
            const novaLinha = template.content.cloneNode(true);
            novaLinha.querySelector(".titulo").textContent = item.title;
            novaLinha.querySelector(".cep").textContent = item.cep;
            novaLinha.querySelector(".endereco").textContent = item.address;
            novaLinha.querySelector(".numero").textContent = item.number;

            novaLinha.querySelector(".atualizar").onclick = function () {
                abrirModalEdicao(item);
            };
            novaLinha.querySelector(".excluir").onclick = function () {
                excluirEndereco(item.id);
            };
            novaLinha.querySelector(".copiar").onclick = function () {
                copiarEndereco(item);
            };


            tabela.appendChild(novaLinha);
        });

    } catch (erro) {
        console.error("Erro ao buscar endereços:", erro);
        tabela.innerHTML = "<tr><td colspan='5'>Erro ao carregar os dados.</td></tr>";
    }
}

function abrirModalEdicao(item) {
    enderecoAtualId = item.id;
    document.getElementById("edit-titulo").value = item.title || '';
    document.getElementById("edit-cep").value = item.cep || '';
    document.getElementById("edit-endereco").value = item.address || '';
    document.getElementById("edit-numero").value = item.number || '';
    document.getElementById("edit-complemento").value = item.complement || '';
    document.getElementById("modal-edicao").style.display = "flex";
}

function fecharModal() {
    document.getElementById("modal-edicao").style.display = "none";
    enderecoAtualId = null;
}

async function salvarEdicao() {
    const tokenData = JSON.parse(localStorage.getItem("user"));
    const token = tokenData?.access_token;

    const dadosAtualizados = {
        title: document.getElementById("edit-titulo").value,
        cep: document.getElementById("edit-cep").value,
        address: document.getElementById("edit-endereco").value,
        number: document.getElementById("edit-numero").value,
        complement: document.getElementById("edit-complemento").value,
    };

    try {
        const resposta = await fetch(`https://go-wash-api.onrender.com/api/auth/address/${enderecoAtualId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(dadosAtualizados)
        });

        if (!resposta.ok) throw new Error("Erro ao salvar atualização");

        alert("Endereço atualizado com sucesso!");
        fecharModal();
        buscarEnderecos();

    } catch (erro) {
        console.error("Erro ao atualizar:", erro);
        alert("Erro ao atualizar o endereço.");
    }
}

async function excluirEndereco(id) {
    const confirmar = confirm("Deseja realmente excluir este endereço?");
    if (!confirmar) return;

    const tokenData = JSON.parse(localStorage.getItem("user"));
    const token = tokenData?.access_token;

    try {
        const resposta = await fetch(`https://go-wash-api.onrender.com/api/auth/address/${id}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        if (!resposta.ok) throw new Error("Erro ao excluir");

        alert("Endereço excluído com sucesso!");
        buscarEnderecos();

    } catch (erro) {
        console.error("Erro ao excluir:", erro);
        alert("Erro ao excluir o endereço.");
    }
}

buscarEnderecos();
    async function copiarEndereco(enderecoOriginal) {
    const tokenData = JSON.parse(localStorage.getItem("user"));
    const token = tokenData?.access_token;

    const novoEndereco = {
        title: enderecoOriginal.title,
        cep: enderecoOriginal.cep,
        address: enderecoOriginal.address,
        number: enderecoOriginal.number,
        complement: enderecoOriginal.complement
    };

    try {
        const resposta = await fetch("https://go-wash-api.onrender.com/api/auth/address", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(novoEndereco)
        });

        if (!resposta.ok) throw new Error("Erro ao copiar endereço");

        alert("Endereço copiado com sucesso!");
        buscarEnderecos();

    } catch (erro) {
        console.error("Erro ao copiar endereço:", erro);
        alert("Erro ao copiar o endereço.");
    }
}
    

