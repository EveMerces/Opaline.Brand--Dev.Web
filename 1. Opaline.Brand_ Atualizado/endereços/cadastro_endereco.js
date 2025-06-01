async function cadastro_endereco (event){
     event.preventDefault();
    let Titulo = document.getElementById("titulo").value
    if (Titulo == ''){
        alert("Digite o Título do local!")
        return
    }
    
    let CEP = document.getElementById("CEP").value
    if (CEP == ''){
        alert("Digite o CEP do local!")
        return
    }
    
    let Endereco = document.getElementById("endereco").value
    if (Endereco == ''){
        alert("Digite o endereço do local!")
        return
    }

    let Numero = document.getElementById("numero").value
    if (Numero == ''){
        alert("Digite o Número do local!")
        return
    }
    
    let Complemento = document.getElementById("complemento").value
    if (Complemento == ''){
        alert("Digite o endereço do local!")
        return
    }

    dados = {
        "title": Titulo,
        "cep": CEP,
        "address": Endereco,
        "number": Numero,
        "complement": Complemento
    }
    
    let api = await fetch("https://go-wash-api.onrender.com/api/auth/address",{
        method: "POST",
        body:JSON.stringify(dados),
        headers: {'content-type':'application/json',
    'Authorization': 'Bearer ' + usuario.access_token
    }
  });

  if (api.ok) {
    alert("Endereço cadastrado com sucesso!");
    window.location.href = "listagem_enderecos.html";
  } else {
    alert("Erro ao cadastrar endereço.");
  }
}