
"use strict";

const listaCarrinho = document.getElementById("listaCarrinho");
const carrinhoVazio = document.getElementById("carrinhoVazio");

const subtotalElemento = document.getElementById("subtotal");
const entregaElemento = document.getElementById("valorEntrega");
const descontoElemento = document.getElementById("valorDesconto");
const totalElemento = document.getElementById("totalCarrinho");

const resumoCarrinho = document.getElementById("resumoCarrinho");
const opcoesEntrega = document.getElementById("opcoesEntrega");
const secaoCupom = document.getElementById("secaoCupom");

const moeda = valor => Number(valor).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
});

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
let cupomAplicado = "";

const taxaEntrega = 5;

function salvarCarrinho() {
    localStorage.setItem("carrinhoSorveteria", JSON.stringify(carrinho));
}

function obterSubtotal() {
    return carrinho.reduce((soma, item) => {
        const preco = Number(item.precoUnitario) || 0;
        const quantidade = Number(item.quantidade) || 1;

        return soma + preco * quantidade;
    }, 0);
}

function obterEntrega() {
    const opcao = document.querySelector('input[name="entrega"]:checked');

    return opcao && opcao.value === "entrega" ? taxaEntrega : 0;
}

function obterDesconto() {
    return cupomAplicado === "SORVETE10"
        ? obterSubtotal() * 0.10
        : 0;
}

function atualizarResumo() {
    const subtotal = obterSubtotal();
    const entrega = obterEntrega();
    const desconto = obterDesconto();
    const total = Math.max(0, subtotal + entrega - desconto);

    subtotalElemento.textContent = moeda(subtotal);
    entregaElemento.textContent = moeda(entrega);
    descontoElemento.textContent = "- " + moeda(desconto);
    totalElemento.textContent = moeda(total);
}

function desenharCarrinho() {
    listaCarrinho.innerHTML = "";

    const temProdutos = carrinho.length > 0;

    carrinhoVazio.hidden = temProdutos;
    resumoCarrinho.hidden = !temProdutos;
    opcoesEntrega.hidden = !temProdutos;
    secaoCupom.hidden = !temProdutos;

    if (!temProdutos) {
        subtotalElemento.textContent = moeda(0);
        entregaElemento.textContent = moeda(0);
        descontoElemento.textContent = moeda(0);
        totalElemento.textContent = moeda(0);
        return;
    }

    carrinho.forEach((item, indice) => {
        const quantidade = Number(item.quantidade) || 1;
        const precoUnitario = Number(item.precoUnitario) || 0;
        const adicionais = Array.isArray(item.adicionais)
            ? item.adicionais
            : [];

        const card = document.createElement("article");
        card.className = "item-carrinho";

        const foto = document.createElement("img");
        foto.className = "imagem-item-carrinho";
        foto.src = item.imagem || "imagens/sem-imagem.png";
        foto.alt = item.nome || "Produto";
        foto.onerror = function () {
            this.style.display = "none";
        };

        const detalhes = document.createElement("div");
        detalhes.className = "detalhes-item-carrinho";

        const nome = document.createElement("h3");
        nome.textContent = item.nome || "Produto";

        const tamanho = document.createElement("p");
        tamanho.textContent = "Tamanho: " + (item.tamanho || "Não informado");

        const textoAdicionais = document.createElement("p");
        textoAdicionais.className = "texto-adicionais";

        if (adicionais.length > 0) {
            textoAdicionais.textContent = "Adicionais: " +
                adicionais.map(a =>
                    `${a.nome} (${moeda(Number(a.preco) || 0)})`
                ).join(", ");
        } else {
            textoAdicionais.textContent = "Sem adicionais";
        }

        const preco = document.createElement("strong");
        preco.className = "preco-item-carrinho";
        preco.textContent = moeda(precoUnitario * quantidade);

        const controles = document.createElement("div");
        controles.className = "controles-quantidade";

        const diminuir = document.createElement("button");
        diminuir.type = "button";
        diminuir.textContent = "−";
        diminuir.setAttribute("aria-label", "Diminuir quantidade");
        diminuir.onclick = () => alterarQuantidade(indice, -1);

        const numero = document.createElement("span");
        numero.textContent = quantidade;

        const aumentar = document.createElement("button");
        aumentar.type = "button";
        aumentar.textContent = "+";
        aumentar.setAttribute("aria-label", "Aumentar quantidade");
        aumentar.onclick = () => alterarQuantidade(indice, 1);

        const remover = document.createElement("button");
        remover.type = "button";
        remover.className = "remover-item";
        remover.textContent = "Remover";
        remover.onclick = () => removerItem(indice);

        controles.append(diminuir, numero, aumentar);
        detalhes.append(
            nome,
            tamanho,
            textoAdicionais,
            preco,
            controles,
            remover
        );

        card.append(foto, detalhes);
        listaCarrinho.appendChild(card);
    });

    atualizarResumo();
}

function alterarQuantidade(indice, alteracao) {
    const atual = Number(carrinho[indice].quantidade) || 1;
    const nova = atual + alteracao;

    if (nova < 1) return;

    carrinho[indice].quantidade = nova;
    salvarCarrinho();
    desenharCarrinho();
}

function removerItem(indice) {
    carrinho.splice(indice, 1);
    salvarCarrinho();
    desenharCarrinho();
}

// Atualiza o valor quando o cliente troca a forma de recebimento
document.querySelectorAll('input[name="entrega"]').forEach(opcao => {
    opcao.addEventListener("change", atualizarResumo);
});

// Aplica o cupom
document.getElementById("aplicarCupom").addEventListener("click", () => {
    const campo = document.getElementById("cupom");
    const mensagem = document.getElementById("mensagemCupom");
    const codigo = campo.value.trim().toUpperCase();

    if (codigo === "SORVETE10") {
        cupomAplicado = codigo;
        mensagem.textContent = "Cupom aplicado! Você ganhou 10% de desconto.";
        mensagem.className = "cupom-sucesso";
    } else {
        cupomAplicado = "";
        mensagem.textContent = "Cupom inválido.";
        mensagem.className = "cupom-erro";
    }

    atualizarResumo();
});

// Prepara o pedido e abre a tela de pagamento
document.getElementById("continuarPagamento").addEventListener("click", () => {
    if (carrinho.length === 0) return;

    const subtotal = obterSubtotal();
    const entrega = obterEntrega();
    const desconto = obterDesconto();
    const opcao = document.querySelector('input[name="entrega"]:checked');

    const dadosPedido = {
        itens: carrinho,
        subtotal: subtotal,
        entrega: entrega,
        desconto: desconto,
        total: Math.max(0, subtotal + entrega - desconto),
        formaRecebimento: opcao ? opcao.value : "retirada",
        cupom: cupomAplicado
    };

    localStorage.setItem(
        "pedidoEmFinalizacao",
        JSON.stringify(dadosPedido)
    );

    window.location.href = "pagamento.html";
});

desenharCarrinho();
