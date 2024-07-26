
idRestauranteLogado = -1

let restaurantesCadastrados = [
    { id: 1311, nome: "Bar do Cuscuz", senha: "bdc123" , chavesGeradas: [], prato: "Cuscuz na nata"},
    { id: 1312, nome: "Manoel da Carne de Sol", senha: "mcs123" , chavesGeradas: [], prato: "Carne de sol na nata"},
    { id: 1314, nome: "Gorlami Pizzaria", senha: "gp123", chavesGeradas: [], prato: "Pizza de pudim"},
    { id: 1313, nome:"Brothers Burguer", senha: "bb123", chavesGeradas: [], prato: "Hambúrguer matuto"}
    
];

function verificarLogin() {
    // Obtém os valores digitados pelo usuário
    let id = parseInt(document.getElementById('id-restaurante').value);
    let senha = document.getElementById('senha-restaurante').value;

    // Verifica se o ID e a senha correspondem a algum restaurante cadastrado
    for (let i = 0; i < restaurantesCadastrados.length; i++) {
        if (restaurantesCadastrados[i].id === id && restaurantesCadastrados[i].senha === senha) {
            alert(`Login bem-sucedido para o restaurante ${restaurantesCadastrados[i].nome}`);
            idRestauranteLogado = id
            localStorage.setItem('idRestauranteLogado', idRestauranteLogado);
            window.location.href = "./restauranteLogin.html";
            return; // Sai da função após o login ser bem-sucedido
        }
    }

    // Se não encontrou um restaurante com as credenciais fornecidas
    alert('ID ou senha incorretos. Tente novamente.');
}


function gerarChaveAleatoria() {
    return Math.random().toString(36).substring(2, 7).toUpperCase();
}

function gerarChave() {
    
    let restaurante = restaurantesCadastrados.find(restaurante => restaurante.id === idRestauranteLogado);
    if (restaurante) {
        
        let novaChave = gerarChaveAleatoria();
        
        restaurante.chavesGeradas.push(novaChave);
        
        document.getElementById('chave-gerada').innerText = novaChave;
        
        localStorage.setItem('restaurantesCadastrados', JSON.stringify(restaurantesCadastrados));
    } else {
        // Se o restaurante não foi encontrado, exibe uma mensagem de erro
        alert('Restaurante não encontrado.');
        window.location.href = './index.html';
    }

}

function validaChave(){
    let chaveDigitada = document.getElementById('chave-digitada').value;
    
    for(let i = 0; i < restaurantesCadastrados.length; i++){
        for(let j = 0; j < restaurantesCadastrados[i].chavesGeradas.length; j++){
            if(restaurantesCadastrados[i].chavesGeradas[j] === chaveDigitada){
                alert("Chave validada!")
                window.location.href = "./votacao.html";
                return;
            }    
        }
    }
    
    alert("Chave inválida. Tente novamente!")
}

// Recupera os dados do localStorage ao carregar a página
window.onload = function() {
    let storedRestaurantes = localStorage.getItem('restaurantesCadastrados');
    if (storedRestaurantes) {
        restaurantesCadastrados = JSON.parse(storedRestaurantes);
    }

    // Recupera o ID do restaurante logado, se houver
    let storedIdRestauranteLogado = localStorage.getItem('idRestauranteLogado');
    if (storedIdRestauranteLogado) {
        idRestauranteLogado = parseInt(storedIdRestauranteLogado);
    }
}