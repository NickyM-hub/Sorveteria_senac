const statusPedido = document.getElementById("statusPedido");
const mensagemStatus = document.getElementById("mensagemStatus");
const statusPagamento = document.getElementById("statusPagamento");

const areaCancelamento = document.getElementById("areaCancelamento");
const areaReembolso = document.getElementById("areaReembolso");
const botaoCancelar = document.getElementById("botaoCancelar");

// Recupera o status salvo no navegador
let statusAtual = localStorage.getItem("statusPedidoAtual") || "preparando";

function atualizarTela() {
    if (statusAtual === "cancelado") {
        statusPedido.textContent = "Pedido cancelado";
        mensagemStatus.textContent =
            "Este pedido foi cancelado.";

        areaCancelamento.hidden = true;
        areaReembolso.hidden = false;

        botaoCancelar.disabled = true;

    } else {
        statusPedido.textContent = "Pedido em preparação";
        mensagemStatus.textContent =
            "Estamos preparando seu pedido com carinho!";

        areaCancelamento.hidden = false;
        areaReembolso.hidden = true;
    }
}

// Cancela o pedido e atualiza a própria tela
botaoCancelar.addEventListener("click", function () {
    const confirmar = window.confirm(
        "Tem certeza de que deseja cancelar este pedido?"
    );

    if (confirmar) {
        statusAtual = "cancelado";

        localStorage.setItem("statusPedidoAtual", statusAtual);

        atualizarTela();
    }
});

// Exibe a situação correta ao abrir a página
atualizarTela();