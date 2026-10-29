
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

// Avaliações de cada produto
// Os comentários e as quantidades são exemplos para o protótipo.

const avaliacoesProdutos = {
    "Sorvete Chocolate": {
        nota: "4,8",
        quantidade: 12,
        comentarios: [
            { cliente: "Mariana", estrelas: 5, comentario: "Muito cremoso e gostoso!" },
            { cliente: "Lucas", estrelas: 5, comentario: "O sabor de chocolate é delicioso." },
            { cliente: "Beatriz", estrelas: 4, comentario: "Gostei bastante, compraria novamente." },
            { cliente: "Pedro", estrelas: 5, comentario: "Chegou bem embalado e estava ótimo." },
            { cliente: "Camila", estrelas: 5, comentario: "Meu sabor favorito da sorveteria!" }
        ]
    },

    "Sorvete Morango": {
        nota: "4,7",
        quantidade: 9,
        comentarios: [
            { cliente: "Ana", estrelas: 5, comentario: "Muito refrescante e saboroso!" },
            { cliente: "Julia", estrelas: 4, comentario: "Gostei bastante do sabor de morango." },
            { cliente: "Rafael", estrelas: 5, comentario: "Doce na medida certa." },
            { cliente: "Larissa", estrelas: 4, comentario: "Muito bom, combina com dias quentes." },
            { cliente: "Felipe", estrelas: 5, comentario: "Amei! Compraria novamente." }
        ]
    },

    "Sorvete Baunilha": {
        nota: "4,8",
        quantidade: 8,
        comentarios: [
            { cliente: "Pedro", estrelas: 5, comentario: "Clássico e muito gostoso!" },
            { cliente: "Camila", estrelas: 5, comentario: "A textura é maravilhosa." },
            { cliente: "Bruno", estrelas: 4, comentario: "Leve e saboroso." },
            { cliente: "Isabela", estrelas: 5, comentario: "Combina com qualquer adicional." },
            { cliente: "Gustavo", estrelas: 5, comentario: "Adorei o sabor suave." }
        ]
    },

    "Sorvete Flocos": {
        nota: "4,9",
        quantidade: 15,
        comentarios: [
            { cliente: "Rafael", estrelas: 5, comentario: "Meu favorito da sorveteria!" },
            { cliente: "Sofia", estrelas: 5, comentario: "Adorei os pedacinhos de chocolate." },
            { cliente: "Marcos", estrelas: 5, comentario: "Muito cremoso e saboroso." },
            { cliente: "Amanda", estrelas: 4, comentario: "Gostei bastante do equilíbrio dos sabores." },
            { cliente: "Daniel", estrelas: 5, comentario: "Sempre escolho esse sabor!" }
        ]
    },

    "Sorvete Napolitano": {
        nota: "4,8",
        quantidade: 10,
        comentarios: [
            { cliente: "Gabriel", estrelas: 5, comentario: "Três sabores deliciosos em um só." },
            { cliente: "Laura", estrelas: 4, comentario: "Muito bom e combina com tudo." },
            { cliente: "Bianca", estrelas: 5, comentario: "Adorei a combinação dos sabores." },
            { cliente: "André", estrelas: 5, comentario: "Ótima opção para quem gosta de variedade." },
            { cliente: "Clara", estrelas: 5, comentario: "Muito gostoso e cremoso." }
        ]
    },

    "Sorvete Coco": {
        nota: "4,6",
        quantidade: 7,
        comentarios: [
            { cliente: "Isabela", estrelas: 5, comentario: "O sabor de coco é maravilhoso!" },
            { cliente: "Bruno", estrelas: 4, comentario: "Leve e muito gostoso." },
            { cliente: "Fernanda", estrelas: 5, comentario: "Tem um sabor delicioso." },
            { cliente: "Thiago", estrelas: 4, comentario: "Gostei bastante, é bem refrescante." },
            { cliente: "Nicole", estrelas: 5, comentario: "Adoro coco e esse sorvete me surpreendeu." }
        ]
    },

    "Sundae Morango": {
        nota: "4,9",
        quantidade: 14,
        comentarios: [
            { cliente: "Fernanda", estrelas: 5, comentario: "A calda de morango é deliciosa!" },
            { cliente: "Letícia", estrelas: 5, comentario: "Bonito, cremoso e muito saboroso." },
            { cliente: "Eduarda", estrelas: 5, comentario: "A combinação ficou perfeita." },
            { cliente: "Caio", estrelas: 4, comentario: "Gostei muito da calda." },
            { cliente: "Manuela", estrelas: 5, comentario: "É doce na medida certa!" }
        ]
    },

    "Sundae Chocolate": {
        nota: "4,8",
        quantidade: 11,
        comentarios: [
            { cliente: "Matheus", estrelas: 5, comentario: "Muito chocolate e muito sabor!" },
            { cliente: "Carolina", estrelas: 4, comentario: "Adorei a combinação com o sorvete." },
            { cliente: "João", estrelas: 5, comentario: "A calda é maravilhosa." },
            { cliente: "Melissa", estrelas: 5, comentario: "Muito cremoso, recomendo!" },
            { cliente: "Vinícius", estrelas: 4, comentario: "Gostei bastante desse sundae." }
        ]
    },

    "Sundae Caramelo": {
        nota: "4,7",
        quantidade: 8,
        comentarios: [
            { cliente: "Diego", estrelas: 5, comentario: "A calda de caramelo é perfeita!" },
            { cliente: "Amanda", estrelas: 4, comentario: "Doce na medida certa." },
            { cliente: "Luiza", estrelas: 5, comentario: "Adorei o sabor do caramelo." },
            { cliente: "Henrique", estrelas: 4, comentario: "Muito bom e bem cremoso." },
            { cliente: "Paula", estrelas: 5, comentario: "Uma delícia, pediria de novo." }
        ]
    },

    "Sundae Especial": {
        nota: "5,0",
        quantidade: 6,
        comentarios: [
            { cliente: "Vitória", estrelas: 5, comentario: "A mistura de chocolate e morango é incrível!" },
            { cliente: "Henrique", estrelas: 5, comentario: "Adorei esse sundae!" },
            { cliente: "Alice", estrelas: 5, comentario: "Minha combinação favorita." },
            { cliente: "Miguel", estrelas: 5, comentario: "Muito saboroso e bonito." },
            { cliente: "Rebeca", estrelas: 5, comentario: "Perfeito para quem gosta de chocolate e morango." }
        ]
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
