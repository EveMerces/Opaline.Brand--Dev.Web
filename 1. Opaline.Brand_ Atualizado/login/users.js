async function save (){
    let name = document.getElementById("nome").value;
    if (name == ''){
        alert("Digite o nome de usuário!")
        return
    }
    let email = document.getElementById("email").value;
    if (email == ''){
        alert("Digite um endereço de email válido!")
        return
    }
    let birthday = document.getElementById("datanasc").value;
    if (birthday == ''){
        alert("Insira uma data de nascimento válida!")
        return
    }
    let password = document.getElementById("senha").value;
    if (password == '' || password.length < 6 ){
        alert("Digite uma senha válida!")
        return
    }
    let CpfCnpj = document.getElementById("cpfcnpj").value;
    if (CpfCnpj == '' || CpfCnpj.length < 11 ){
        alert("Digite um CPF ou CNPJ válidos!")
        return
    }
    let termos = document.getElementById("termos").checked;
    if (termos == false){
        alert("Por favor, aceite os termos de uso!")
    }
    let userType = 1
    
    dados = {
          "name": name,
          "email": email,
          "user_type_id": userType,
          "password": password,
          "cpf_cnpj": CpfCnpj,
          "terms": termos,
          "birthday": birthday
    }

    let api = await fetch("https://go-wash-api.onrender.com/api/user",{
      method: "POST",
      body:JSON.stringify(dados),
          headers: {'content-type':'application/json'}
      });

      if (api.ok){
          let resp = await api.json();
          console.log(resp);
          alert("Usuário cadastrado!");
          return
      }else { 
        let respError = await api.json();
        console.log(respError)
            if (respError.data.errors.email) {
                alert('The email has already been taken.')
            }

            if (respError.data.errors.cpf_cnpj == null) {
                alert('cpf_cppj invalid.')
            } else {
                alert('The cpf cnpj has already been taken.')
            }
    }
  }


function cadastro(){
    save();
    
}