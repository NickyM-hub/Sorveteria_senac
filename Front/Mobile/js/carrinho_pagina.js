
"use strict";

const listaCarrinho = document.getElementById("listaCarrinho");
const carrinhoVazio = document.getElementById("carrinhoVazio");
const opcoesEntrega = document.getElementById("opcoesEntrega");
const secaoCupom = document.getElementById("secaoCupom");
const resumoCarrinho = document.getElementById("resumoCarrinho");
const menuBotoes = document.querySelector(".menu-botoes-produto");

const subtotalElemento = document.getElementById("subtotal");
const valorEntregaElemento = document.getElementById("valorEntrega");
const valorDescontoElemento = document.getElementById("valorDesconto");
const totalElemento = document.getElementById("totalCarrinho");

const campoCupom = document.getElementById("cupom");
const botaoAplicarCupom = document.getElementById("aplicarCupom");
const mensagemCupom = document.getElementById("mensagemCupom");
const botaoFinalizar = document.getElementById("finalizarPedido");

const TAXA_ENTREGA = 5;
let cupomAplicado = "";

function lerCarrinho() {
    try {
        const dados = JSON.parse(
            localStorage.getItem("carrinhoSorveteria")
        );

        return Array.isArray(dados) ? dados : [];
    } catch {
        return [];
    }
}

let carrinho = lerCarrinho();

function salvarCarrinho() {
    localStorage.setItem(
        "carrinhoSorveteria",
        JSON.stringify(carrinho)
    );
}

function formatarPreco(valor) {
    return Number(valor || 0).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}

function obterSubtotal() {
    return carrinho.reduce((total, item) => {
        const preco = Number(item.precoUnitario) || 0;
        const quantidade = Number(item.quantidade) || 1;

        return total + preco * quantidade;
    }, 0);
}

function obterEntrega() {
    const opcaoSelecionada = document.querySelector(
        'input[name="entrega"]:checked'
    );

    return opcaoSelecionada &&
        opcaoSelecionada.value === "entrega"
        ? TAXA_ENTREGA
        : 0;
}

function obterDesconto() {
    const subtotal = obterSubtotal();

    if (cupomAplicado === "SORVETE10" && subtotal >= 20) {
        return subtotal * 0.10;
    }

    return 0;
}

function atualizarResumo() {
    const subtotal = obterSubtotal();
    const entrega = obterEntrega();
    const desconto = obterDesconto();
    const total = Math.max(0, subtotal + entrega - desconto);

    subtotalElemento.textContent = formatarPreco(subtotal);
    valorEntregaElemento.textContent = formatarPreco(entrega);
    valorDescontoElemento.textContent = formatarPreco(desconto);
    totalElemento.textContent = formatarPreco(total);
}

function desenharCarrinho() {
    carrinho = lerCarrinho();
    listaCarrinho.replaceChildren();

    const temProdutos = carrinho.length > 0;

    // Esconde a página inteira quando o carrinho está vazio.
    document.body.classList.toggle(
        "carrinho-vazio",
        !temProdutos
    );

    carrinhoVazio.hidden = temProdutos;
    opcoesEntrega.hidden = !temProdutos;
    secaoCupom.hidden = !temProdutos;
    resumoCarrinho.hidden = !temProdutos;

    if (menuBotoes) {
        menuBotoes.hidden = !temProdutos;
    }

    if (!temProdutos) {
        subtotalElemento.textContent = formatarPreco(0);
        valorEntregaElemento.textContent = formatarPreco(0);
        valorDescontoElemento.textContent = formatarPreco(0);
        totalElemento.textContent = formatarPreco(0);
        return;
    }

    carrinho.forEach((item, indice) => {
        const card = document.createElement("article");
        card.className = "item-carrinho";

        const imagem = document.createElement("img");
        imagem.className = "imagem-item-carrinho";
        imagem.src = item.imagem || "";
        imagem.alt = item.nome || "Produto";
        imagem.hidden = !item.imagem;

        const informacoes = document.createElement("div");
        informacoes.className = "informacoes-item-carrinho";

        const nome = document.createElement("h3");
        nome.textContent = item.nome || "Produto";

        const tamanho = document.createElement("p");
        tamanho.textContent = "Tamanho: " + (item.tamanho || "Não informado");

        const descricao = document.createElement("p");
        descricao.textContent = item.descricao || "";

        const adicionais = document.createElement("p");
        adicionais.textContent =
            item.adicionais && item.adicionais.length
                ? "Adicionais: " + item.adicionais
                    .map(adicional =>
                        typeof adicional === "string"
                            ? adicional
                            : adicional.nome || ""
                    )
                    .filter(Boolean)
                    .join(", ")
                : "";

        const preco = document.createElement("p");
        preco.className = "preco-item-carrinho";
        preco.textContent = formatarPreco(
            (Number(item.precoUnitario) || 0) *
            (Number(item.quantidade) || 1)
        );

        const controles = document.createElement("div");
        controles.className = "controles-quantidade";

        const diminuir = document.createElement("button");
        diminuir.type = "button";
        diminuir.textContent = "−";
        diminuir.setAttribute("aria-label", "Diminuir quantidade");
        diminuir.addEventListener("click", () => {
            alterarQuantidade(indice, -1);
        });

        const quantidade = document.createElement("span");
        quantidade.textContent = Number(item.quantidade) || 1;

        const aumentar = document.createElement("button");
        aumentar.type = "button";
        aumentar.textContent = "+";
        aumentar.setAttribute("aria-label", "Aumentar quantidade");
        aumentar.addEventListener("click", () => {
            alterarQuantidade(indice, 1);
        });

        const remover = document.createElement("button");
        remover.type = "button";
        remover.className = "remover-item";
        remover.textContent = "Remover";
        remover.addEventListener("click", () => {
            removerItem(indice);
        });

        controles.append(diminuir, quantidade, aumentar);

        informacoes.append(
            nome,
            tamanho,
            descricao,
            adicionais,
            preco,
            controles,
            remover
        );

        card.append(imagem, informacoes);
        listaCarrinho.appendChild(card);
    });

    atualizarResumo();
}

function alterarQuantidade(indice, alteracao) {
    if (!carrinho[indice]) return;

    const quantidadeAtual =
        Number(carrinho[indice].quantidade) || 1;

    const novaQuantidade = quantidadeAtual + alteracao;

    if (novaQuantidade <= 0) {
        removerItem(indice);
        return;
    }

    carrinho[indice].quantidade = novaQuantidade;
    salvarCarrinho();
    desenharCarrinho();
}

function removerItem(indice) {
    carrinho.splice(indice, 1);
    salvarCarrinho();
    desenharCarrinho();
}

document.querySelectorAll('input[name="entrega"]').forEach(opcao => {
    opcao.addEventListener("change", atualizarResumo);
});

botaoAplicarCupom.addEventListener("click", () => {
    const codigo = campoCupom.value.trim().toUpperCase();

    if (codigo === "SORVETE10" && obterSubtotal() >= 20) {
        cupomAplicado = codigo;
        mensagemCupom.textContent = "Cupom aplicado: 10% de desconto!";
    } else if (codigo === "SORVETE10") {
        cupomAplicado = "";
        mensagemCupom.textContent =
            "Seu pedido precisa ter subtotal de pelo menos R$ 20,00.";
    } else {
        cupomAplicado = "";
        mensagemCupom.textContent = "Cupom inválido ou não reconhecido.";
    }

    atualizarResumo();
});

botaoFinalizar.addEventListener("click", () => {
    if (carrinho.length === 0) return;

    const opcaoSelecionada = document.querySelector(
        'input[name="entrega"]:checked'
    );

    const pedido = {
        itens: carrinho,
        subtotal: obterSubtotal(),
        entrega: obterEntrega(),
        desconto: obterDesconto(),
        total: Math.max(
            0,
            obterSubtotal() + obterEntrega() - obterDesconto()
        ),
        formaRecebimento: opcaoSelecionada
            ? opcaoSelecionada.value
            : "retirada",
        cupom: cupomAplicado
    };

    localStorage.setItem(
        "pedidoEmFinalizacao",
        JSON.stringify(pedido)
    );

    window.location.href = "pagamento.html";
});

// Atualiza a tela ao abrir o carrinho.
desenharCarrinho();

// Atualiza se o carrinho for alterado em outra aba.
window.addEventListener("storage", evento => {
    if (evento.key === "carrinhoSorveteria") {
        desenharCarrinho();
    }
});
