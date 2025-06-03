async function cadastro_endereco(event) {
    event.preventDefault();

    const usuarioJson = localStorage.getItem("user");
    if (!usuarioJson) {
        alert("Token não encontrado. Faça login novamente.");
        window.location.href = '../login/login.html';
        return;
    }

    let usuario;
    try {
        usuario = JSON.parse(usuarioJson);
    } catch (e) {
        console.error("Falha ao fazer parse de localStorage['user']:", e);
        alert("Erro interno. Faça login novamente.");
        window.location.href = '../login/login.html';
        return;
    }

    if (!usuario.access_token) {
        alert("Token inválido. Faça login novamente.");
        window.location.href = '../login/login.html';
        return;
    }

    const token = usuario.access_token;

    const Titulo = document.getElementById("titulo")?.value.trim();
    const CEP = document.getElementById("CEP")?.value.trim();
    const Endereco = document.getElementById("endereco")?.value.trim();
    const Numero = document.getElementById("numero")?.value.trim();
    const Complemento = document.getElementById("complemento")?.value.trim();

    if (!Titulo) {
        alert("Digite o Título do local!");
        return;
    }
    if (!CEP || CEP.length !== 8) {
        alert("Digite um CEP válido");
        return;
    }
    if (!Endereco) {
        alert("Digite o endereço do local!");
        return;
    }
    if (!Numero) {
        alert("Digite o Número do local!");
        return;
    }
    if (!Complemento) {
        alert("Digite o complemento do local!");
        return;
    }

    const dados = {
        title: Titulo,
        cep: CEP,
        address: Endereco,
        number: Numero,
        complement: Complemento
    };

    console.log("Payload a ser enviado:", dados);

    try {
        const api = await fetch("https://go-wash-api.onrender.com/api/auth/address", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            },
            body: JSON.stringify(dados)
        });

        if (api.ok) {
            alert("Endereço cadastrado com sucesso!");
            window.location.href = "listagem_enderecos.html";
            return;
        }

        const respostaTexto = await api.text();
        let respostaErro;

        try {
            respostaErro = JSON.parse(respostaTexto);
        } catch (e) {
            respostaErro = respostaTexto;
        }

        console.error(`Erro ao cadastrar (status ${api.status}):`, respostaErro);
        alert(`Erro ao cadastrar endereço (status ${api.status}). Veja o console para detalhes.`);

    } catch (networkErr) {
        console.error("Falha na requisição (rede/internet):", networkErr);
        alert("Erro de conexão. Tente novamente mais tarde.");
    }
}
