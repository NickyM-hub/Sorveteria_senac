
"use strict";

document.addEventListener("DOMContentLoaded", () => {
    const chaveCarrinho = "carrinhoSorveteria";

    const tamanhos = document.querySelectorAll(
        'input[name="tamanho"]'
    );

    const adicionaisGratis = document.querySelectorAll(
        'input[name="adicionais-gratis"]'
    );

    const adicionaisPagos = document.querySelectorAll(
        'input[name="adicionais-pagos"]'
    );

    const frutas = document.querySelectorAll(
        'input[name="frutas"]'
    );

    const quantidadeTexto = document.getElementById("quantidadeProduto");
    const precoUnitarioTexto = document.getElementById("precoUnitario");
    const totalProdutoTexto = document.getElementById("totalProduto");
    const valorExtrasTexto = document.getElementById("valorExtras");

    const botaoDiminuir = document.getElementById("diminuirQuantidade");
    const botaoAumentar = document.getElementById("aumentarQuantidade");

    const botaoCarrinho = document.querySelector(".botao-carrinho");
    const botaoComprar = document.querySelector(".botao-comprar");

    let quantidade = 1;

    function moeda(valor) {
        return valor.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        });
    }

    function selecionados(lista) {
        return [...lista].filter(item => item.checked);
    }

    // Os primeiros 3 adicionais comuns e as primeiras 2 frutas
    // são gratuitos; os demais são cobrados.
    function calcularExtras() {
        let total = 0;
        const adicionais = [];

        selecionados(adicionaisGratis).forEach((item, indice) => {
            const preco = indice < 3
                ? 0
                : Number(item.dataset.preco || 1.50);

            total += preco;
            adicionais.push({
                nome: item.value,
                preco: preco
            });
        });

        selecionados(adicionaisPagos).forEach(item => {
            const preco = Number(item.dataset.preco || 0);

            total += preco;
            adicionais.push({
                nome: item.value,
                preco: preco
            });
        });

        selecionados(frutas).forEach((item, indice) => {
            const preco = indice < 2
                ? 0
                : Number(item.dataset.preco || 2.00);

            total += preco;
            adicionais.push({
                nome: item.value,
                preco: preco
            });
        });

        return { total, adicionais };
    }

    function obterPrecoTamanho() {
        const selecionado = document.querySelector(
            'input[name="tamanho"]:checked'
        );

        return selecionado
            ? Number(selecionado.dataset.preco || 0)
            : 0;
    }

    function atualizarResumo() {
        const extras = calcularExtras();
        const unitario = obterPrecoTamanho() + extras.total;

        quantidadeTexto.textContent = quantidade;
        precoUnitarioTexto.textContent = moeda(unitario);
        totalProdutoTexto.textContent = moeda(unitario * quantidade);

        if (valorExtrasTexto) {
            valorExtrasTexto.textContent = moeda(extras.total);
        }
    }

    botaoDiminuir.addEventListener("click", () => {
        if (quantidade > 1) {
            quantidade--;
            atualizarResumo();
        }
    });

    botaoAumentar.addEventListener("click", () => {
        quantidade++;
        atualizarResumo();
    });

    [...tamanhos, ...adicionaisGratis, ...adicionaisPagos, ...frutas]
        .forEach(item => {
            item.addEventListener("change", atualizarResumo);
        });

    function adicionarAoCarrinho() {
        const escolhidosGratis = selecionados(adicionaisGratis);

        if (escolhidosGratis.length < 3) {
            alert("Escolha pelo menos 3 adicionais grátis.");
            return false;
        }

        const tamanho = document.querySelector(
            'input[name="tamanho"]:checked'
        );

        if (!tamanho) {
            alert("Escolha o tamanho do açaí.");
            return false;
        }

        const extras = calcularExtras();
        const precoBase = obterPrecoTamanho();
        const precoUnitario = precoBase + extras.total;

        const produto = {
            nome: "Açaí",
            descricao: "Melhor sabor de sua escolha!",
            imagem: "imagens/acai.png",
            tamanho: tamanho.value.replace("ml", " ml"),
            quantidade: quantidade,
            adicionais: extras.adicionais,
            precoUnitario: precoUnitario
        };

        let carrinho = [];

        try {
            carrinho = JSON.parse(
                localStorage.getItem(chaveCarrinho) || "[]"
            );

            if (!Array.isArray(carrinho)) {
                carrinho = [];
            }
        } catch {
            carrinho = [];
        }

        // Agrupa apenas produtos com as mesmas escolhas.
        const assinatura = item => JSON.stringify([
            item.nome,
            item.tamanho,
            [...(item.adicionais || [])]
                .sort((a, b) => a.nome.localeCompare(b.nome))
        ]);

        const existente = carrinho.find(
            item => assinatura(item) === assinatura(produto)
        );

        if (existente) {
            existente.quantidade =
                Number(existente.quantidade || 0) + quantidade;
        } else {
            carrinho.push(produto);
        }

        localStorage.setItem(
            chaveCarrinho,
            JSON.stringify(carrinho)
        );

        return true;
    }

    botaoCarrinho.addEventListener("click", () => {
        if (adicionarAoCarrinho()) {
            window.location.href = "carrinho.html";
        }
    });

    botaoComprar.addEventListener("click", () => {
        if (adicionarAoCarrinho()) {
            window.location.href = "carrinho.html";
        }
    });

    atualizarResumo();
});
