
"use strict";

// Catálogo de produtos
const catalogo = {
    "Sorvete Chocolate": {
        imagem: "imagens/sorvete-chocolate.png",
        descricao: "Cremoso e irresistível!",
        nota: "4,8",
        precos: { 200: 9.50, 350: 14.90, 500: 17.70 }
    },

    "Sorvete Morango": {
        imagem: "imagens/sorvete-morango.png",
        descricao: "Doce e refrescante!",
        nota: "4,7",
        precos: { 200: 9.50, 350: 14.90, 500: 17.70 }
    },

    "Sorvete Baunilha": {
        imagem: "imagens/sorvete-baunilha.png",
        descricao: "Clássico e delicioso!",
        nota: "4,8",
        precos: { 200: 9.50, 350: 14.90, 500: 17.70 }
    },

    "Sorvete Flocos": {
        imagem: "imagens/sorvete-flocos.png",
        descricao: "Baunilha com pedaços de chocolate!",
        nota: "4,9",
        precos: { 200: 9.50, 350: 14.90, 500: 17.70 }
    },

    "Sorvete Napolitano": {
        imagem: "imagens/sorvete-napolitano.png",
        descricao: "Chocolate, morango e baunilha!",
        nota: "4,8",
        precos: { 200: 9.50, 350: 14.90, 500: 17.70 }
    },

    "Sorvete Coco": {
        imagem: "imagens/sorvete-coco.png",
        descricao: "Leve e cheio de sabor!",
        nota: "4,6",
        precos: { 200: 9.50, 350: 14.90, 500: 17.70 }
    },

    "Sundae Morango": {
        imagem: "imagens/sundae-morango.png",
        descricao: "Sorvete com deliciosa calda de morango!",
        nota: "4,9",
        precos: { 200: 12.50, 350: 16.50, 500: 20.50 }
    },

    "Sundae Chocolate": {
        imagem: "imagens/sundae-chocolate.png",
        descricao: "Sorvete com calda de chocolate!",
        nota: "4,8",
        precos: { 200: 12.50, 350: 16.50, 500: 20.50 }
    },

    "Sundae Caramelo": {
        imagem: "imagens/sundae-caramelo.png",
        descricao: "Sorvete com calda de caramelo!",
        nota: "4,7",
        precos: { 200: 12.50, 350: 16.50, 500: 20.50 }
    },

    "Sundae Especial": {
        imagem: "imagens/sundae-chocolate-morango.png",
        descricao: "Uma combinação de chocolate e morango!",
        nota: "5,0",
        precos: { 200: 14.50, 350: 18.50, 500: 22.50 }
    }
};



// Formata os valores em reais
const moeda = valor => Number(valor).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
});

// Recupera o produto indicado na URL
const parametros = new URLSearchParams(window.location.search);
const nomeSelecionado = parametros.get("nome");

const nomeValido = Object.prototype.hasOwnProperty.call(
    catalogo,
    nomeSelecionado
);

if (!nomeValido) {
    alert("Produto não identificado. Volte e selecione um sorvete.");
    window.location.replace("sorvetes.html");
} else {

    const nomeAtual = nomeSelecionado;
    const produto = catalogo[nomeAtual];

    // Preenche os dados do produto
    document.getElementById("nomeProduto").textContent = nomeAtual;

    const imagemProduto = document.getElementById("imagemProduto");
    imagemProduto.src = produto.imagem;
    imagemProduto.alt = nomeAtual;

    document.getElementById("descricaoProduto").textContent =
        produto.descricao;

    document.getElementById("notaProduto").textContent =
        produto.nota;

    // Carrega as avaliações do produto selecionado
    function carregarAvaliacoes(nomeProduto) {
        const avaliacoes = avaliacoesProdutos[nomeProduto];

        const notaResumo = document.getElementById("notaResumo");
        const quantidadeAvaliacoes =
            document.getElementById("quantidadeAvaliacoes");
        const listaAvaliacoes =
            document.getElementById("listaAvaliacoes");

        if (!notaResumo || !quantidadeAvaliacoes || !listaAvaliacoes) {
            return;
        }

        if (!avaliacoes) {
            notaResumo.textContent = "0,0";
            quantidadeAvaliacoes.textContent = "(0 avaliações)";
            listaAvaliacoes.textContent =
                "Este produto ainda não possui avaliações.";
            return;
        }

        notaResumo.textContent = avaliacoes.nota;

        quantidadeAvaliacoes.textContent =
            `(${avaliacoes.quantidade} avaliações)`;

        listaAvaliacoes.replaceChildren();

        avaliacoes.comentarios.forEach(avaliacao => {
            const artigo = document.createElement("article");
            artigo.classList.add("item-avaliacao");

            const nomeCliente = document.createElement("h3");
            nomeCliente.textContent = avaliacao.cliente;

            const estrelas = document.createElement("p");
            estrelas.classList.add("estrelas");
            estrelas.setAttribute(
                "aria-label",
                `${avaliacao.estrelas} de 5 estrelas`
            );

            estrelas.textContent =
                "★".repeat(avaliacao.estrelas) +
                "☆".repeat(5 - avaliacao.estrelas);

            const comentario = document.createElement("p");
            comentario.textContent = avaliacao.comentario;

            artigo.append(nomeCliente, estrelas, comentario);
            listaAvaliacoes.appendChild(artigo);
        });
    }

    carregarAvaliacoes(nomeAtual);

    // Preenche os preços dos tamanhos
    [200, 350, 500].forEach(tamanho => {
        document.getElementById("preco" + tamanho).textContent =
            moeda(produto.precos[tamanho]);
    });

    const tamanhos = document.querySelectorAll(
        'input[name="tamanho"]'
    );

    const adicionais = document.querySelectorAll(
        'input[name="adicional"]'
    );

    const quantidade = document.getElementById("quantidadeProduto");

    // Calcula o preço de acordo com as escolhas
    function calcularTotal() {
        const tamanhoSelecionado = document.querySelector(
            'input[name="tamanho"]:checked'
        );

        if (!tamanhoSelecionado) {
            return null;
        }

        const tamanho = Number(tamanhoSelecionado.value);
        const precoBase = produto.precos[tamanho];

        const adicionaisSelecionados = Array.from(adicionais)
            .filter(item => item.checked)
            .map(item => ({
                nome: item.value,
                preco: Number(item.dataset.preco)
            }));

        const totalAdicionais = adicionaisSelecionados.reduce(
            (soma, item) => soma + item.preco,
            0
        );

        const totalUnitario = precoBase + totalAdicionais;
        const qtd = Math.max(1, Number(quantidade.value) || 1);
        const total = totalUnitario * qtd;

        quantidade.value = qtd;

        document.getElementById("precoProduto").textContent =
            moeda(precoBase);

        document.getElementById("totalProduto").textContent =
            moeda(total);

        return {
            tamanho,
            quantidade: qtd,
            adicionaisSelecionados,
            totalUnitario,
            total
        };
    }

    // Atualiza os preços quando o cliente faz uma escolha
    tamanhos.forEach(item => {
        item.addEventListener("change", calcularTotal);
    });

    adicionais.forEach(item => {
        item.addEventListener("change", calcularTotal);
    });

    quantidade.addEventListener("change", calcularTotal);

    // Adiciona o produto ao carrinho
    document.getElementById("adicionarCarrinho")
        .addEventListener("click", () => {

            const pedido = calcularTotal();

            if (!pedido) {
                alert("Selecione um tamanho para continuar.");
                return;
            }

            const novoItem = {
                nome: nomeAtual,
                descricao: produto.descricao,
                imagem: produto.imagem,
                tamanho: pedido.tamanho + " ml",
                quantidade: pedido.quantidade,
                adicionais: pedido.adicionaisSelecionados,
                precoUnitario: pedido.totalUnitario
            };

            let carrinho = [];

            try {
                carrinho = JSON.parse(
                    localStorage.getItem("carrinhoSorveteria")
                ) || [];

                if (!Array.isArray(carrinho)) {
                    carrinho = [];
                }
            } catch {
                carrinho = [];
            }

            // Compara os adicionais para agrupar itens iguais
            const chaveAdicionais = item => JSON.stringify(
                (item.adicionais || [])
                    .map(adicional => ({
                        nome: adicional.nome,
                        preco: Number(adicional.preco)
                    }))
                    .sort((a, b) => a.nome.localeCompare(b.nome))
            );

            const existente = carrinho.find(item =>
                item.nome === novoItem.nome &&
                item.tamanho === novoItem.tamanho &&
                chaveAdicionais(item) === chaveAdicionais(novoItem)
            );

            if (existente) {
                existente.quantidade =
                    (Number(existente.quantidade) || 1) +
                    novoItem.quantidade;
            } else {
                carrinho.push(novoItem);
            }

            localStorage.setItem(
                "carrinhoSorveteria",
                JSON.stringify(carrinho)
            );

            const mensagem =
                document.getElementById("mensagemCarrinho");

            mensagem.textContent =
                "✓ Produto adicionado ao carrinho!";

            mensagem.hidden = false;
            mensagem.classList.add("mostrar");
        });

    // Calcula o preço inicial
    calcularTotal();
}
