
"use strict";

// ==========================================
// 1. CATÁLOGO DE TODOS OS PRODUTOS
// ==========================================

const catalogo = {

    // SORVETES

    "Sorvete Chocolate": {
        tipo: "sorvete",
        imagem: "imagens/sorvete-chocolate.png",
        descricao: "Cremoso e irresistível!",
        nota: "4,8",
        precos: { 200: 9.50, 350: 14.90, 500: 17.70 }
    },

    "Sorvete Morango": {
        tipo: "sorvete",
        imagem: "imagens/sorvete-morango.png",
        descricao: "Doce e refrescante!",
        nota: "4,7",
        precos: { 200: 9.50, 350: 14.90, 500: 17.70 }
    },

    "Sorvete Baunilha": {
        tipo: "sorvete",
        imagem: "imagens/sorvete-baunilha.png",
        descricao: "Clássico e delicioso!",
        nota: "4,8",
        precos: { 200: 9.50, 350: 14.90, 500: 17.70 }
    },

    "Sorvete Flocos": {
        tipo: "sorvete",
        imagem: "imagens/sorvete-flocos.png",
        descricao: "Baunilha com pedaços de chocolate!",
        nota: "4,9",
        precos: { 200: 9.50, 350: 14.90, 500: 17.70 }
    },

    "Sorvete Napolitano": {
        tipo: "sorvete",
        imagem: "imagens/sorvete-napolitano.png",
        descricao: "Chocolate, morango e baunilha!",
        nota: "4,8",
        precos: { 200: 9.50, 350: 14.90, 500: 17.70 }
    },

    "Sorvete Coco": {
        tipo: "sorvete",
        imagem: "imagens/sorvete-coco.png",
        descricao: "Leve e cheio de sabor!",
        nota: "4,6",
        precos: { 200: 9.50, 350: 14.90, 500: 17.70 }
    },

    // SUNDAES

    "Sundae Morango": {
        tipo: "sundae",
        imagem: "imagens/sundae-morango.png",
        descricao: "Sorvete com deliciosa calda de morango!",
        nota: "4,9",
        precos: { 200: 12.50, 350: 16.50, 500: 20.50 }
    },

    "Sundae Chocolate": {
        tipo: "sundae",
        imagem: "imagens/sundae-chocolate.png",
        descricao: "Sorvete com calda de chocolate!",
        nota: "4,8",
        precos: { 200: 12.50, 350: 16.50, 500: 20.50 }
    },

    "Sundae Caramelo": {
        tipo: "sundae",
        imagem: "imagens/sundae-caramelo.png",
        descricao: "Sorvete com calda de caramelo!",
        nota: "4,7",
        precos: { 200: 12.50, 350: 16.50, 500: 20.50 }
    },

    "Sundae Especial": {
        tipo: "sundae",
        imagem: "imagens/sundae-chocolate-morango.png",
        descricao: "Uma combinação de chocolate e morango!",
        nota: "5,0",
        precos: { 200: 14.50, 350: 18.50, 500: 22.50 }
    },

    // BEBIDAS

    "Milk-shake Oreo": {
        tipo: "bebida",
        imagem: "imagens/milkshake-oreo.png",
        descricao: "Cremoso e delicioso!",
        nota: "5,0",
        precos: { 400: 15.50 }
    },

    "Coca-Cola": {
        tipo: "bebida",
        imagem: "imagens/coca-cola.png",
        descricao: "Refrigerante gelado!",
        nota: "4,8",
        precos: { 350: 3.90 }
    },

    "Água Mineral": {
        tipo: "bebida",
        imagem: "imagens/agua-mineral.png",
        descricao: "Clássica e deliciosa!",
        nota: "4,7",
        precos: { 500: 2.00 }
    },

    "Milk-shake Caramelo": {
        tipo: "bebida",
        imagem: "imagens/milkshake-caramelo.png",
        descricao: "Três sabores em um só!",
        nota: "4,9",
        precos: { 500: 21.00 }
    }
};


// ==========================================
// 2. APELIDOS USADOS NOS LINKS DAS BEBIDAS
// ==========================================

const produtosPorSlug = {
    "milkshake-oreo": "Milk-shake Oreo",
    "coca-cola": "Coca-Cola",
    "agua-mineral": "Água Mineral",
    "milkshake-caramelo": "Milk-shake Caramelo"
};


// ==========================================
// 3. FORMATAÇÃO DE PREÇOS
// ==========================================

const moeda = valor => Number(valor).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
});


// ==========================================
// 4. IDENTIFICA O PRODUTO PELA URL
// ==========================================

const parametros = new URLSearchParams(window.location.search);

const nomeDaURL = parametros.get("nome");
const slugDaURL = parametros.get("produto");

const nomeSelecionado =
    nomeDaURL || produtosPorSlug[slugDaURL];

const produto = nomeSelecionado
    ? catalogo[nomeSelecionado]
    : null;

if (!produto) {

    alert("Produto não identificado. Volte e selecione um produto.");

    window.location.replace("inicio.html");

} else {

    // ==========================================
    // 5. MOSTRA OS DADOS DO PRODUTO
    // ==========================================

    document.getElementById("nomeProduto").textContent =
        nomeSelecionado;

    const imagem = document.getElementById("imagemProduto");

    imagem.src = produto.imagem;
    imagem.alt = nomeSelecionado;

    document.getElementById("descricaoProduto").textContent =
        produto.descricao;

    document.getElementById("notaProduto").textContent =
        produto.nota;


    // ==========================================
    // 6. MOSTRA AS AVALIAÇÕES
    // ==========================================

    function carregarAvaliacoes(nome) {

        const avaliacoes =
            window.avaliacoesProdutos?.[nome];

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

            const cliente = document.createElement("h3");
            cliente.textContent = avaliacao.cliente;

            const estrelas = document.createElement("p");
            estrelas.classList.add("estrelas");

            estrelas.textContent =
                "★".repeat(avaliacao.estrelas) +
                "☆".repeat(5 - avaliacao.estrelas);

            const comentario = document.createElement("p");
            comentario.textContent = avaliacao.comentario;

            artigo.append(cliente, estrelas, comentario);

            listaAvaliacoes.appendChild(artigo);
        });
    }

    carregarAvaliacoes(nomeSelecionado);


    // ==========================================
    // 7. CRIA AS OPÇÕES DE TAMANHO
    // ==========================================

    const areaTamanhos = document.getElementById("opcoesTamanho");

    if (!areaTamanhos) {

        console.error(
            'Adicione ao HTML um elemento com id="opcoesTamanho".'
        );

    } else {

        areaTamanhos.replaceChildren();

        Object.entries(produto.precos).forEach(([tamanho, preco], indice) => {

            const label = document.createElement("label");

            const radio = document.createElement("input");

            radio.type = "radio";
            radio.name = "tamanho";
            radio.value = tamanho;
            radio.checked = indice === 0;

            const texto = document.createElement("span");

            texto.textContent =
                `${tamanho} ml - ${moeda(preco)}`;

            label.append(radio, texto);

            areaTamanhos.appendChild(label);
        });
    }


    // ==========================================
    // 8. ELEMENTOS DA TELA
    // ==========================================

    const tamanhos = document.querySelectorAll(
        'input[name="tamanho"]'
    );

    const adicionais = document.querySelectorAll(
        'input[name="adicional"]'
    );

    const quantidade = document.getElementById("quantidadeProduto");

    const precoProduto = document.getElementById("precoProduto");

    const totalProduto = document.getElementById("totalProduto");

    const botaoAdicionar = document.getElementById("adicionarCarrinho");


    // ==========================================
    // 9. CALCULA O VALOR DO PEDIDO
    // ==========================================

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

        const qtd = Math.max(
            1,
            Number(quantidade?.value) || 1
        );

        const total = totalUnitario * qtd;

        if (quantidade) {
            quantidade.value = qtd;
        }

        if (precoProduto) {
            precoProduto.textContent = moeda(precoBase);
        }

        if (totalProduto) {
            totalProduto.textContent = moeda(total);
        }

        return {
            tamanho,
            quantidade: qtd,
            adicionaisSelecionados,
            totalUnitario,
            total
        };
    }


    // ==========================================
    // 10. ATUALIZA O PREÇO QUANDO MUDA A ESCOLHA
    // ==========================================

    document.querySelectorAll('input[name="tamanho"]').forEach(item => {
        item.addEventListener("change", calcularTotal);
    });

    adicionais.forEach(item => {
        item.addEventListener("change", calcularTotal);
    });

    quantidade?.addEventListener("change", calcularTotal);


    // ==========================================
    // 11. ADICIONA AO CARRINHO
    // ==========================================

    botaoAdicionar.addEventListener("click", () => {

        const pedido = calcularTotal();

        if (!pedido) {

            alert("Selecione um tamanho para continuar.");

            return;
        }

        const novoItem = {

            nome: nomeSelecionado,

            tipo: produto.tipo,

            descricao: produto.descricao,

            imagem: produto.imagem,

            tamanho: pedido.tamanho + " ml",

            quantidade: pedido.quantidade,

            adicionais: pedido.adicionaisSelecionados,

            precoUnitario: pedido.totalUnitario
        };


        // Recupera os produtos já adicionados

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


        // Compara os adicionais para identificar itens iguais

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


        // Salva no mesmo carrinho usado pelos outros produtos

        localStorage.setItem(
            "carrinhoSorveteria",
            JSON.stringify(carrinho)
        );


        // Exibe mensagem de confirmação

        const mensagem = document.getElementById("mensagemCarrinho");

        if (mensagem) {

            mensagem.textContent =
                "✓ Produto adicionado ao carrinho!";

            mensagem.hidden = false;

            mensagem.classList.add("mostrar");
        }

    });


    // ==========================================
    // 12. CALCULA O PREÇO INICIAL
    // ==========================================

    calcularTotal();

}
