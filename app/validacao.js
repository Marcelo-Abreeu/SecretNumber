var pontos = document.getElementById('pontos');
var pontosSalvos = localStorage.getItem('pontos');
pontos.innerHTML = pontosSalvos ? pontosSalvos : "0";

function verificaSeOChutePossuiUmValorValido(chute) {
    const numero = +chute

    if (chuteForInvalido(numero)) {
        if (chute.toUpperCase() === "GAME OVER") {

            document.body.innerHTML = `
                <h2 class="acertou">Game Over!!!</h2>
                <h3>Pressione o botão para jogar novamente</h3>
                <button id="jogar-novamente" class="btn-jogar" >Jogar novamente</button>
            `
            pontos.innerHTML = "0";

        } else {
            elementoChute.innerHTML += '<div>Valor Inválido</div>';
        }
    }

    if (numeroForMaiorOuMenorQueOValorPermitido(numero)) {
        elementoChute.innerHTML += `
        <div>Valor inválido: Fale um número entre ${menorValor} e ${maiorValor}</div>
        `
        return
    }

    if (numero === numeroSecreto) {
        atualizarPontuacao();
        mostrarMensagemAcertou();

    } else if (numero > numeroSecreto) {
        elementoChute.innerHTML += `
        <div>O número secreto é menor <i class="fa-sharp fa-solid fa-angle-down color"></i></div>
        `
    } else {
        elementoChute.innerHTML += `
        <div>O número secreto é maior <i class="fa-sharp fa-solid fa-angle-up color"></i></div>
        `
    }
}

function chuteForInvalido(numero) {
    return Number.isNaN(numero)
}

function numeroForMaiorOuMenorQueOValorPermitido(numero){
    return numero > maiorValor || numero < menorValor
}

document.body.addEventListener('click', e => {
    if (e.target.id == 'jogar-novamente') {
        localStorage.setItem('pontos', pontos.innerHTML); // Salva os pontos no localStorage
        window.location.reload()

    }
});

function mostrarMensagemAcertou() {
    document.body.innerHTML = `
        <h2 class="acertou">Você acertou!</h2>
        <h3>O número secreto era <span class="acertou">${numeroSecreto}</span></h3>
        <div><span id="pontos">${pontos.innerHTML}</span></div>
        <button id="jogar-novamente" class="btn-jogar">Jogar novamente</button>
    `;
}

function atualizarPontuacao() {
    pontos.innerHTML = String(parseInt(pontos.innerHTML) + 1);
}