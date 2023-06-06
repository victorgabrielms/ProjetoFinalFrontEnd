function validar() {

    var dado = {};
    dado.email = document.getElementById('iptEmail').value;
    dado.senha = document.getElementById('iptSenha').value;

    console.log(dado);

    if (validarUsuario(dado) == true) {

        location.href="mensagens.html";
    } else {
        alert('Usuário e senha incorretos!');
    }

}

function criarObjeto() {
    var nome = document.getElementById("iptNomeMsg").value;
    var email = document.getElementById("iptEmailMsg").value;
    var mensagem = document.getElementById("txaMensagemMsg").value;

    var obj = { nome: nome, email: email, mensagem: mensagem };
    console.log(obj);
    inserirMensagem(obj);
}

function login() {
    var email = document.getElementById("iptEmail").value;
    var senha = document.getElementById("iptSenha").value;

    var objLogin = {email: email, senha: senha};
    console.log(objLogin);
    validar();

}
function criarLinhasTabela() {
    var mensagens = obterMensagens();
    
    
    for (var i = 0; i < mensagens.length; i++) {
        var nome = mensagens[i].nome;
        var email = mensagens[i].email;
        var mensagem = mensagens[i].mensagem;

        var linha = document.createElement('tr');

        var tdNome = document.createElement('td');
        tdNome.innerHTML = nome;

        var tdEmail = document.createElement('td');
        tdEmail.innerHTML = email;
    
        var tdMensagem = document.createElement('td');
        tdMensagem.innerHTML = mensagem;
    
        linha.appendChild(tdNome);
        linha.appendChild(tdEmail);
        linha.appendChild(tdMensagem);
    
        var tabela = document.getElementById("tabela");
        tabela.appendChild(linha);
    }
    estilizarTabela();
}
function estilizarTabela(){

    var linhas = document.getElementsByTagName('tr');
    var pintar = true;

    for(var i = 1; i<linhas.length; i++){

        if(pintar){
            linhas[i].setAttribute('style', 'background-color:#f3f3f3; color:write;')
            pintar = false;
        }else {
            pintar = true;
        }
    }

}
//window.onload = criarLinhasTabela;

function obterMensagens() {

    var retorno = [];

    var consulta = $.ajax({
        url: 'http://prj-p2-js.herokuapp.com/mensagens',
        method: 'GET',
        dataType: 'json',
        async: false
    }).fail(function(){
        return retorno;
    });

    consulta.done(function(data) {
        retorno = data;
    });

    return retorno;
}

function inserirMensagem(obj) {

    var inserir = $.ajax({

        url: 'http://prj-p2-js.herokuapp.com/mensagens',
        method: 'POST',
        data: JSON.stringify(obj),
        dataType: 'json',
        async: false,
        contentType: 'application/json',
    });
}

function excluirMensagem(idMsg) {

    var inserir = $.ajax({

        url: 'http://prj-p2-js.herokuapp.com/mensagens' + '/' + toString(idMsg),
        method: 'DELETE',
        async: false
    });
}

function validarUsuario(objLoginSenha) {

    //email: admin@admin.com
    //senha: '1234'

    var retorno = false;

    var consulta = $.ajax({
        url: 'http://prj-p2-js.herokuapp.com/usuarios/validar',
        method: 'POST',
        dataType: 'json',
        async: false,
        data: JSON.stringify(objLoginSenha),
        contentType: 'application/json'
    }).fail(function(){
        return retorno;
    });

    consulta.done(function(data) {
        retorno = data;
    });

    return retorno;
}
