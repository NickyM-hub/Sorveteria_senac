"use strict";

// ==========================================
// 1. CATÁLOGO DE PRODUTOS
// ==========================================

const catalogo = {

    // --------------------------------------
    // SORVETES
    // --------------------------------------

    "Sorvete Chocolate": {
        tipo: "sorvete",
        imagem: "imagens/sorvete-chocolate.png",
        descricao: "Cremoso e irresistível!",
        nota: "4,8",
        precos: {
            200: 9.50,
            350: 14.90,
            500: 17.70
        }
    },

    "Sorvete Morango": {
        tipo: "sorvete",
        imagem: "imagens/sorvete-morango.png",
        descricao: "Doce e refrescante!",
        nota: "4,7",
        precos: {
            200: 9.50,
            350: 14.90,
            500: 17.70
        }
    },

    "Sorvete Baunilha": {
        tipo: "sorvete",
        imagem: "imagens/sorvete-baunilha.png",
        descricao: "Clássico e delicioso!",
        nota: "4,8",
        precos: {
            200: 9.50,
            350: 14.90,
            500: 17.70
        }
    },

    "Sorvete Flocos": {
        tipo: "sorvete",
        imagem: "imagens/sorvete-flocos.png",
        descricao: "Baunilha com pedaços de chocolate!",
        nota: "4,9",
        precos: {
            200: 9.50,
            350: 14.90,
            500: 17.70
        }
    },

    "Sorvete Napolitano": {
        tipo: "sorvete",
        imagem: "imagens/sorvete-napolitano.png",
        descricao: "Chocolate, morango e baunilha!",
        nota: "4,8",
        precos: {
            200: 9.50,
            350: 14.90,
            500: 17.70
        }
    },

    "Sorvete Coco": {
        tipo: "sorvete",
        imagem: "imagens/sorvete-coco.png",
        descricao: "Leve e cheio de sabor!",
        nota: "4,6",
        precos: {
            200: 9.50,
            350: 14.90,
            500: 17.70
        }
    },


    // --------------------------------------
    // SUNDAES
    // --------------------------------------

    "Sundae Morango": {
        tipo: "sundae",
        imagem: "imagens/sundae-morango.png",
        descricao: "Sorvete com deliciosa calda de morango!",
        nota: "4,9",
        precos: {
            200: 12.50,
            350: 16.50,
            500: 20.50
        }
    },

    "Sundae Chocolate": {
        tipo: "sundae",
        imagem: "imagens/sundae-chocolate.png",
        descricao: "Sorvete com calda de chocolate!",
        nota: "4,8",
        precos: {
            200: 12.50,
            350: 16.50,
            500: 20.50
        }
    },

    "Sundae Caramelo": {
        tipo: "sundae",
        imagem: "imagens/sundae-caramelo.png",
        descricao: "Sorvete com calda de caramelo!",
        nota: "4,7",
        precos: {
            200: 12.50,
            350: 16.50,
            500: 20.50
        }
    },

    "Sundae Especial": {
        tipo: "sundae",
        imagem: "imagens/sundae-chocolate-morango.png",
        descricao: "Uma combinação de chocolate e morango!",
        nota: "5,0",
        precos: {
            200: 14.50,
            350: 18.50,
            500: 22.50
        }
    },


    // --------------------------------------
    // BEBIDAS
    // --------------------------------------

    "Milk-shake Oreo": {
        tipo: "Sorvete",
        imagem: "imagens/milkshake-oreo.png",
        descricao: "Cremoso e delicioso!",
        nota: "5,0",
        precos: {
            200: 12.50,
            350: 15.50,
            500: 18.50

        }
    },

    "Coca-Cola": {
        tipo: "bebida",
        imagem: "imagens/coca-cola.png",
        descricao: "Refrigerante gelado!",
        nota: "4,8",
        precos: {
            350: 3.90,
            500: 5.50

        }
    },

    "Água Mineral": {
        tipo: "bebida",
        imagem: "imagens/agua-mineral.png",
        descricao: "Clássica e deliciosa!",
        nota: "4,7",
        precos: {
            350: 2.50,
            500: 3.50
        }
    },

    "Milk-shake Caramelo": {
        tipo: "Sorvete",
        imagem: "imagens/milkshake-caramelo.png",
        descricao: "Três sabores em um só!",
        nota: "4,9",
        precos: {
            200: 12.50,
            350: 15.50, 
            500: 18.50
        }
    },

    "Milk-shake Morango": {
        tipo: "Sorvete",
        imagem: "imagens/milkshake-morango.png",
        descricao: "Delicioso e cheio de sabor!",
        nota: "4,8",
        precos: {
            200: 12.50,
            350: 15.50,
            500: 18.50
        }
    },

    "Milk-shake Ovomaltine": {
        tipo: "Sorvete",
        imagem: "imagens/milkshake-ovomaltine.png",
        descricao: "Crocante e muito cremoso!",
        nota: "4,9",
        precos: {
            200: 12.50,
            350: 15.50,
            500: 18.50
        }
    },

    "Milk-shake Ninho": {
        tipo: "Sorvete",
        imagem: "imagens/milkshake-ninho.png",
        descricao: "Suave, doce e irresistível!",
        nota: "4,8",
        precos: {
            200: 12.50,
            350: 15.50,
            500: 18.50
        }
    },

    "Milk-shake Paçoca": {
        tipo: "Sorvete",
        imagem: "imagens/milkshake-pacoca.png",
        descricao: "Uma combinação deliciosa!",
        nota: "4,9",
        precos: {
            200: 12.50,
            350: 15.50,
            500: 18.50
        }
    }

};


// ==========================================
// 2. NORMALIZAÇÃO DOS NOMES
// ==========================================

function normalizarNome(nome) {

    return String(nome || "")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .replace(/[^a-z0-9]/g, "");

}


// ==========================================
// 3. APELIDOS PARA RECONHECER OS PRODUTOS
// ==========================================

const apelidosProdutos = {

    "milkshakeoreo": "Milk-shake Oreo",

    "milkshakecaramelo": "Milk-shake Caramelo",

    "milkshakemorango": "Milk-shake Morango",

    "milkshakeovomaltine": "Milk-shake Ovomaltine",

    "milkshakeninho": "Milk-shake Ninho",

    "milkshakepacoca": "Milk-shake Paçoca",

    "cocacola": "Coca-Cola",

    "aguamineral": "Água Mineral",

    "sorvetechocolate": "Sorvete Chocolate",

    "sorvetemorango": "Sorvete Morango",

    "sorvetebaunilha": "Sorvete Baunilha",

    "sorveteflocos": "Sorvete Flocos",

    "sorvetenapolitano": "Sorvete Napolitano",

    "sorvetecoco": "Sorvete Coco",

    "sundaemorango": "Sundae Morango",

    "sundaechocolate": "Sundae Chocolate",

    "sundaecaramelo": "Sundae Caramelo",

    "sundaeespecial": "Sundae Especial"

};


// ==========================================
// 4. FORMATAÇÃO DE PREÇOS
// ==========================================

const moeda = valor => Number(valor).toLocaleString("pt-BR", {

    style: "currency",

    currency: "BRL"

});


// ==========================================
// 5. IDENTIFICA O PRODUTO PELA URL
// ==========================================

const parametros = new URLSearchParams(window.location.search);

const nomeDaURL = parametros.get("nome");

const slugDaURL = parametros.get("produto");

const origemDaURL = parametros.get("origem");


// Procura o nome recebido no link

const nomeNormalizado = normalizarNome(nomeDaURL || slugDaURL);


// Procura primeiro no catálogo

let nomeSelecionado = Object.keys(catalogo).find(nome => {

    return normalizarNome(nome) === nomeNormalizado;

});


// Caso não encontre, procura nos apelidos

if (!nomeSelecionado) {

    nomeSelecionado = apelidosProdutos[nomeNormalizado];

}


const produto = nomeSelecionado ? catalogo[nomeSelecionado] : null;


// ==========================================
// 6. VERIFICA SE O PRODUTO EXISTE
// ==========================================

if (!produto) {

    alert("Produto não identificado. Volte e selecione um produto.");

    window.location.replace("inicio.html");

} else {


    // ==========================================
    // 7. MOSTRA OS DADOS DO PRODUTO
    // ==========================================

    const nomeProduto = document.getElementById("nomeProduto");

    const imagemProduto = document.getElementById("imagemProduto");

    const descricaoProduto = document.getElementById("descricaoProduto");

    const notaProduto = document.getElementById("notaProduto");


    if (nomeProduto) {

        nomeProduto.textContent = nomeSelecionado;

    }


    if (imagemProduto) {

        imagemProduto.src = produto.imagem;

        imagemProduto.alt = nomeSelecionado;

    }


    if (descricaoProduto) {

        descricaoProduto.textContent = produto.descricao;

    }


    if (notaProduto) {

        notaProduto.textContent = produto.nota;

    }


    // ==========================================
    // 8. CONFIGURA OS BOTÕES DE VOLTAR
    // ==========================================

    const botaoVoltar = document.getElementById("botaoVoltar");

    const botaoContinuar = document.getElementById("botaoContinuar");


    // Verifica de qual tela o cliente veio

    let paginaOrigem;


    if (origemDaURL === "bebidas" || produto.tipo === "bebida") {

        paginaOrigem = "bebidas.html";

    } else {

        paginaOrigem = "sorvetes.html";

    }


    if (botaoVoltar) {

        botaoVoltar.href = paginaOrigem;

    }


    if (botaoContinuar) {

        botaoContinuar.href = paginaOrigem;

    }


    // ==========================================
    // 9. CONFIGURA OS ADICIONAIS
    // ==========================================

    const secaoAdicionais = document.getElementById("secaoAdicionais");

    const adicionais = document.querySelectorAll(
        'input[name="adicional"]'
    );


    // Bebidas não possuem adicionais

    if (produto.tipo === "bebida") {

        if (secaoAdicionais) {

            secaoAdicionais.hidden = true;

        }

        adicionais.forEach(adicional => {

            adicional.checked = false;

        });

    } else {

        if (secaoAdicionais) {

            secaoAdicionais.hidden = false;

        }

    }


    // ==========================================
    // 10. CRIA AS OPÇÕES DE TAMANHO
    // ==========================================

    const areaTamanhos = document.getElementById("opcoesTamanho");

    const secaoTamanhos = document.getElementById("secaoTamanhos");


    if (areaTamanhos) {

        areaTamanhos.replaceChildren();


        Object.entries(produto.precos).forEach(([tamanho, preco], indice) => {

            const label = document.createElement("label");

            label.classList.add("item-tamanho");


            const radio = document.createElement("input");

            radio.type = "radio";

            radio.name = "tamanho";

            radio.value = tamanho;

            radio.checked = indice === 0;


            const texto = document.createElement("span");

            texto.textContent = `${tamanho}ml - ${moeda(preco)}`;


            label.append(radio, texto);

            areaTamanhos.appendChild(label);

        });


    } else {

        console.error("Não foi encontrado o elemento opcoesTamanho.");

    }


    // ==========================================
    // 11. ELEMENTOS DA TELA
    // ==========================================

    const quantidade = document.getElementById("quantidadeProduto");

    const precoProduto = document.getElementById("precoProduto");

    const totalProduto = document.getElementById("totalProduto");

    const botaoAdicionar = document.getElementById("adicionarCarrinho");

    const mensagemCarrinho = document.getElementById("mensagemCarrinho");


    // ==========================================
    // 12. CALCULA O TOTAL
    // ==========================================

    function calcularTotal() {

        const tamanhoSelecionado = document.querySelector(
            'input[name="tamanho"]:checked'
        );


        if (!tamanhoSelecionado) {

            return null;

        }


        const tamanho = Number(tamanhoSelecionado.value);

        const precoBase = Number(produto.precos[tamanho]);


        // Busca adicionais selecionados

        const adicionaisSelecionados = Array.from(adicionais)

            .filter(item => item.checked)

            .map(item => ({

                nome: item.value,

                preco: Number(item.dataset.preco)

            }));


        // Soma os adicionais

        const totalAdicionais = adicionaisSelecionados.reduce(

            (soma, item) => soma + item.preco,

            0

        );


        // Calcula preço de uma unidade

        const totalUnitario = precoBase + totalAdicionais;


        // Quantidade

        const qtd = Math.max(

            1,

            Number(quantidade?.value) || 1

        );


        // Calcula total

        const total = totalUnitario * qtd;


        // Atualiza preço na tela

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
    // 13. ATUALIZA O PREÇO AUTOMATICAMENTE
    // ==========================================

    document.querySelectorAll('input[name="tamanho"]').forEach(item => {

        item.addEventListener("change", calcularTotal);

    });


    adicionais.forEach(item => {

        item.addEventListener("change", calcularTotal);

    });


    if (quantidade) {

        quantidade.addEventListener("change", calcularTotal);

    }


    // ==========================================
    // 14. ADICIONAR AO CARRINHO
    // ==========================================

    if (botaoAdicionar) {

        botaoAdicionar.addEventListener("click", function () {


            const pedido = calcularTotal();


            if (!pedido) {

                alert("Selecione um tamanho para continuar.");

                return;

            }


            // Cria o produto para o carrinho

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


            // ==========================================
            // RECUPERA O CARRINHO
            // ==========================================

            let carrinho = [];


            try {

                carrinho = JSON.parse(

                    localStorage.getItem("carrinhoSorveteria")

                ) || [];


                if (!Array.isArray(carrinho)) {

                    carrinho = [];

                }

            } catch (erro) {

                carrinho = [];

            }


            // ==========================================
            // IDENTIFICA PRODUTOS IGUAIS
            // ==========================================

            function chaveAdicionais(item) {

                return JSON.stringify(

                    (item.adicionais || [])

                        .map(adicional => ({

                            nome: adicional.nome,

                            preco: Number(adicional.preco)

                        }))

                        .sort((a, b) => a.nome.localeCompare(b.nome))

                );

            }


            const existente = carrinho.find(item =>

                item.nome === novoItem.nome &&

                item.tamanho === novoItem.tamanho &&

                chaveAdicionais(item) === chaveAdicionais(novoItem)

            );


            // ==========================================
            // SOMA A QUANTIDADE OU ADICIONA NOVO
            // ==========================================

            if (existente) {

                existente.quantidade =

                    (Number(existente.quantidade) || 1) +

                    novoItem.quantidade;

            } else {

                carrinho.push(novoItem);

            }


            // ==========================================
            // SALVA O CARRINHO
            // ==========================================

            localStorage.setItem(

                "carrinhoSorveteria",

                JSON.stringify(carrinho)

            );


            // ==========================================
            // MOSTRA MENSAGEM
            // ==========================================

            if (mensagemCarrinho) {

                mensagemCarrinho.textContent =
                    "✓ Produto adicionado ao carrinho!";

                mensagemCarrinho.hidden = false;

                mensagemCarrinho.classList.add("mostrar");

            }

        });

    }


    // ==========================================
    // 15. CARREGA AVALIAÇÕES
    // ==========================================

    function carregarAvaliacoes(nome) {

        const avaliacoes = window.avaliacoesProdutos?.[nome];


        const notaResumo = document.getElementById("notaResumo");

        const quantidadeAvaliacoes = document.getElementById(
            "quantidadeAvaliacoes"
        );

        const listaAvaliacoes = document.getElementById(
            "listaAvaliacoes"
        );


        if (!notaResumo || !quantidadeAvaliacoes || !listaAvaliacoes) {

            return;

        }


        // Caso não tenha avaliações

        if (!avaliacoes) {

            notaResumo.textContent = produto.nota || "0,0";

            quantidadeAvaliacoes.textContent = "(0 avaliações)";

            listaAvaliacoes.textContent =
                "Este produto ainda não possui avaliações.";

            return;

        }


        // Atualiza nota e quantidade

        notaResumo.textContent = avaliacoes.nota;

        quantidadeAvaliacoes.textContent =
            `(${avaliacoes.quantidade} avaliações)`;


        // Limpa avaliações anteriores

        listaAvaliacoes.replaceChildren();


        // Mostra avaliações

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


    // Carrega avaliações do produto

    carregarAvaliacoes(nomeSelecionado);


    // ==========================================
    // 16. CALCULA O PREÇO INICIAL
    // ==========================================

    calcularTotal();


}