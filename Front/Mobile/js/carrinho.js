
"use strict";

function adicionarCarrinho(botao) {
    const card = botao.closest(".card-sorvete");

    if (!card) return;

    const nome = card.querySelector("h2").textContent.trim();
    const descricao = card.querySelector(".info-sorvete p").textContent.trim();
    const precoTexto = card.querySelector(".preco-sorvete").textContent;
    const tamanhoTexto = card.querySelector(".tamanho-sorvete").textContent.trim();
    const imagem = card.querySelector(".foto-sorvete").getAttribute("src");

    const precoUnitario = Number(
        precoTexto.replace("R$", "")
            .trim()
            .replace(/\./g, "")
            .replace(",", ".")
    );

    const tamanho = tamanhoTexto.toLowerCase().includes("ml")
        ? tamanhoTexto
        : tamanhoTexto + " ml";

    let carrinho = [];

    try {
        carrinho = JSON.parse(
            localStorage.getItem("carrinhoSorveteria")
        ) || [];

        if (!Array.isArray(carrinho)) carrinho = [];
    } catch {
        carrinho = [];
    }

    const existente = carrinho.find(item =>
        item.nome === nome &&
        item.tamanho === tamanho &&
        (!item.adicionais || item.adicionais.length === 0)
    );

    if (existente) {
        existente.quantidade =
            (Number(existente.quantidade) || 1) + 1;
    } else {
        carrinho.push({
            nome: nome,
            descricao: descricao,
            imagem: imagem,
            tamanho: tamanho,
            precoUnitario: precoUnitario,
            quantidade: 1,
            adicionais: []
        });
    }

    localStorage.setItem(
        "carrinhoSorveteria",
        JSON.stringify(carrinho)
    );

    let mensagem = card.querySelector(".mensagem-carrinho");

    if (!mensagem) {
        mensagem = document.createElement("p");
        mensagem.className = "mensagem-carrinho";
        mensagem.setAttribute("role", "status");
        mensagem.setAttribute("aria-live", "polite");

        card.querySelector(".info-sorvete").appendChild(mensagem);
    }

    mensagem.textContent = "✓ Item adicionado ao carrinho!";
    mensagem.classList.add("mostrar");
}
