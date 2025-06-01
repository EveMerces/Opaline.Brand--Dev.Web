async function listagem(){

    let token = JSON.parse(localStorage.getItem
    ("user"));
    
    let api = await fetch("https://go-wash-api.onrender.com/api/auth/address", {
        method: "GET",
        headers: {
            'Content-type': 'application/json', 
            'Authorization': 'Bearer ' + token.access_token
    
        }

    });
    if (api.ok){
        let response = await api.json()
        console.log(response)
    }
}
//Requisições
async function FazerRequisão(url, metodo, corpo = null) {
    let configuração = {
        method: metodo,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    };

    if (corpo) configuração.body = JSON.stringify(corpo)

        let resposta = await fetch(url,configuração);
        console.log("Ok", resposta)

    if (!resposta.ok) {
        throw new error (`Erro ${response.status}: ${response.statusText}`);
    }

    return response.json();
}

async function buscandoApi() {
    try {
        const response = await fetch('https://go-wash-api.onrender.com/api/auth/address', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        
        if (!response.ok) {
            throw new Error(`Erro HTTP! status: ${response.status}`);
        }

        let responseData = await response.json();
        console.log("Dados recebidos:", responseData);
        
        
        if (Array.isArray(enderecos) && enderecos.length > 0) {
            enderecos.forEach((item )=> {
                let newRow = elementos.modeloLinha.cloneNode(true);
                let TBody = document.querySelector("table TBody")
                newRow.id = `endereco_${item.id}`;
                newRow.style.display = "";
                
                // Remove IDs duplicados
                newRow.querySelectorAll('[id]').forEach(el => el.removeAttribute('id'));
                
                // Preenche os dados - ATUALIZADO COM OS NOMES DE CAMPOS CORRETOS
                newRow.querySelector("Title").value = item.title || '';
                newRow.querySelector("Cep").value = item.cep || item.cop || ''; // Note o fallback para 'cop'
                newRow.querySelector("Address").value = item.address || '';
                newRow.querySelector("Number").value = item.number || '';
                
                // Configura os botões
                newRow.querySelector(".atualizar").onclick = () => atualizar(item.id);
                newRow.querySelector(".excluir").onclick = () => excluir(item.id);
                
                TBody.appendChild(newRow);
            });
        } else {
            console.log("Sem dados cadastrados...");
            const tr = document.createElement('tr');
            tr.innerHTML = '<td colspan="7">Nenhum endereço cadastrado</td>';
            TBody.appendChild(tr);
        }
    } catch (error) {
        console.error("Erro ao buscar endereços:", error);
        const tr = document.createElement('tr');
        tr.innerHTML = '<td colspan="7">Erro ao carregar endereços</td>';
        TBody.appendChild(tr);
    }
}
 
//Cadastro
async function cadastrar() {
    try {
        let linha = document.getElementById ('Campos_${id}');
            let campos_html = {
                Título: document.getElementById("Title").value,
                CEP: document.getElementById("Cep").value,
                Rua: document.getElementById("Address").value,
                Número: document.getElementById("Number").value,
            };

                 await fazerRequisicao('https://go-wash-api.onrender.com/api/auth/address', 'POST', campos_html);

                 alert("Endereço cadastrado com sucesso!");
                 resetarFormulario();
                 await buscandoApi();
    } catch (error) {
                console.error("Erro ao cadastrar:", error);
                alert("Erro ao cadastrar endereço. Verifique os dados e tente novamente.");
    }
}

//Atualização
    async function atualizar(parametro) {
        try {
            let linha = document.getElementById ('Campos_${id}');
            let campos_html = {
                Título: linha.querySelector("Título").value,
                CEP: linha.querySelector("CEP").value,
                Rua: linha.querySelector("Rua").value,
                Número: linha.querySelector("Número").value,
            };

            await FazerRequisão(`https://go-wash-api.onrender.com/api/auth/address/${id}`, 
            'POST', 
            campos_html
        );
        
        alert("Endereço atualizado com sucesso!");
        await buscandoApi();
    } catch (error) {
        console.error("Erro ao atualizar:", error);
        alert("Erro ao atualizar endereço.");
    }
}

//Exclusão
async function excluir(id) {
    if (!confirm('Tem certeza que deseja excluir?')) return;
    
    try {
        await fazerRequisicao(
            `https://go-wash-api.onrender.com/api/auth/address/${id}`, 
            'DELETE'
        );
        
        alert("Endereço excluído com sucesso!");
        await buscandoApi();
    } catch (error) {
        console.error("Erro ao excluir:", error);
        alert("Erro ao excluir endereço.");
    }
}

