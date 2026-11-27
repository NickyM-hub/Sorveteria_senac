
// Recuperar pedido salvo pelo carrinho
const pedido = JSON.parse(
    localStorage.getItem("pedidoEmFinalizacao")
);

// Verificar se existe um pedido
if (!pedido || !pedido.itens || pedido.itens.length === 0) {

    alert("Seu carrinho está vazio!");

    window.location.href = "carrinho.html";

}


// Elementos do resumo
const listaProdutos = document.getElementById("listaProdutosPagamento");

const subtotalPagamento = document.getElementById("subtotalPagamento");
const entregaPagamento = document.getElementById("entregaPagamento");
const descontoPagamento = document.getElementById("descontoPagamento");
const totalPagamento = document.getElementById("totalPagamento");


// Formatar valores
function formatarPreco(valor) {

    return Number(valor || 0).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });

}


// Mostrar produtos do pedido
if (pedido && pedido.itens) {

    pedido.itens.forEach(function (item) {

        const produto = document.createElement("article");

        const nome = document.createElement("strong");

        nome.textContent = item.nome;

        const quantidade = document.createElement("span");

        quantidade.textContent =
            " x " + (Number(item.quantidade) || 1);

        const preco = document.createElement("p");

        preco.textContent = formatarPreco(
            Number(item.precoUnitario) *
            (Number(item.quantidade) || 1)
        );

        produto.append(nome, quantidade, preco);

        // Mostrar adicionais
        if (item.adicionais && item.adicionais.length > 0) {

            const adicionais = document.createElement("p");

            adicionais.textContent = "Adicionais: " +
                item.adicionais.map(function(adicional) {

                    return typeof adicional === "string"
                        ? adicional
                        : adicional.nome || "";

                }).filter(Boolean).join(", ");

            produto.appendChild(adicionais);

        }

        listaProdutos.appendChild(produto);

    });


    // Mostrar valores do pedido
    subtotalPagamento.textContent =
        formatarPreco(pedido.subtotal);

    entregaPagamento.textContent =
        formatarPreco(pedido.entrega);

    descontoPagamento.textContent =
        formatarPreco(pedido.desconto);

    totalPagamento.textContent =
        formatarPreco(pedido.total);

}


// Endereço
const botaoAlterar = document.getElementById("botaoAlterar");
const botaoCancelar = document.getElementById("botaoCancelar");

const modalEndereco = document.getElementById("modalEndereco");
const formEndereco = document.getElementById("formEndereco");

const nomeEndereco = document.getElementById("nomeEndereco");
const ruaEndereco = document.getElementById("ruaEndereco");
const complementoEndereco = document.getElementById("complementoEndereco");


function mostrarEndereco(endereco) {

    nomeEndereco.textContent = "Meu endereço";

    ruaEndereco.textContent =
        endereco.rua + ", " + endereco.numero;

    complementoEndereco.textContent =
        endereco.complemento +
        " - " + endereco.bairro +
        ", " + endereco.cidade +
        " - " + endereco.estado +
        " | CEP: " + endereco.cep;

}


// Carregar endereço salvo
const enderecoSalvo = localStorage.getItem("enderecoUsuario");

if (enderecoSalvo) {

    mostrarEndereco(JSON.parse(enderecoSalvo));

}


// Abrir janela
botaoAlterar.addEventListener("click", function() {

    modalEndereco.hidden = false;

});


// Fechar janela
botaoCancelar.addEventListener("click", function() {

    modalEndereco.hidden = true;

});


// Salvar endereço
formEndereco.addEventListener("submit", function(evento) {

    evento.preventDefault();

    const endereco = {

        cep: document.getElementById("cep").value,
        rua: document.getElementById("rua").value,
        numero: document.getElementById("numero").value,
        complemento: document.getElementById("complemento").value,
        bairro: document.getElementById("bairro").value,
        cidade: document.getElementById("cidade").value,
        estado: document.getElementById("estado").value

    };

    localStorage.setItem(
        "enderecoUsuario",
        JSON.stringify(endereco)
    );

    mostrarEndereco(endereco);

    modalEndereco.hidden = true;

    alert("Endereço atualizado!");

});


// Copiar PIX demonstrativo
const codigoPix = "PIX-SORVETERIA-123456789";

botaoCopiar.addEventListener("click", async function() {

    try {

        await navigator.clipboard.writeText(codigoPix);

        alert("Código PIX copiado!");

    } catch {

        alert("Não foi possível copiar o código PIX.");

    }

});


// Confirmar pedido
botaoConfirmar.addEventListener("click", function() {

    if (
        pedido.formaRecebimento === "entrega" &&
        !localStorage.getItem("enderecoUsuario")
    ) {

        alert("Informe o endereço de entrega!");

        modalEndereco.hidden = false;

        return;

    }

    sessionStorage.setItem("pagamentoConfirmado", "true");

    window.location.href = "pg_confirmacao.html";

});
