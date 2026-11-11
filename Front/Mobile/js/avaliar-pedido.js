
"use strict";

/* ========================================
   1. IDENTIFICAR O PEDIDO
======================================== */

const parametros = new URLSearchParams(window.location.search);

const idPedido = parametros.get("id");

const lista = document.getElementById("listaAvaliacoes");

const mensagem = document.getElementById("mensagemAvaliacao");

const voltar = document.getElementById("voltarPedido");

voltar.href =
    `detalhes-pedido.html?id=${encodeURIComponent(idPedido || "")}`;


/* ========================================
   2. CARREGAR PEDIDOS
======================================== */

function carregarPedidos() {

    return JSON.parse(
        localStorage.getItem("sorveteria_pedidos") || "[]"
    );

}


/* ========================================
   3. CARREGAR AVALIAÇÕES
======================================== */

function carregarAvaliacoes() {

    return JSON.parse(
        localStorage.getItem("sorveteria_avaliacoes") || "[]"
    );

}


/* ========================================
   4. SALVAR AVALIAÇÕES
======================================== */

function salvarAvaliacoes(avaliacoes) {

    localStorage.setItem(
        "sorveteria_avaliacoes",
        JSON.stringify(avaliacoes)
    );

}


/* ========================================
   5. MOSTRAR MENSAGENS
======================================== */

function mostrarMensagem(texto) {

    mensagem.textContent = texto;

    mensagem.hidden = false;

}


/* ========================================
   6. LOCALIZAR E CONFERIR PEDIDO
======================================== */

function iniciarTela() {

    const pedidos = carregarPedidos();

    const pedido = pedidos.find(
        p => String(p.id) === String(idPedido)
    );

    if (!pedido) {

        mostrarMensagem("Pedido não encontrado.");

        return;

    }

    if (pedido.status !== "Entregue") {

        mostrarMensagem(
            "A avaliação estará disponível somente depois da entrega do pedido."
        );

        return;

    }

    document.getElementById("numeroPedido").textContent =
        `Pedido #${pedido.id}`;

    renderizarProdutos(pedido);

}


/* ========================================
   7. MOSTRAR PRODUTOS
======================================== */

function renderizarProdutos(pedido) {

    lista.innerHTML = "";

    const avaliacoes = carregarAvaliacoes();

    pedido.produtos.forEach((produto, indice) => {

        const avaliacaoExistente = avaliacoes.find(a =>
            String(a.pedidoId) === String(pedido.id) &&
            a.produtoIndice === indice
        );

        const cartao = document.createElement("article");

        cartao.className = "card-avaliacao";

        /* Imagem */

        const imagem = document.createElement("img");

        imagem.src = produto.imagem;

        imagem.alt = produto.nome;

        imagem.onerror = () => {
            imagem.style.display = "none";
        };

        /* Nome */

        const nome = document.createElement("h3");

        nome.textContent = produto.nome;

        /* Descrição */

        const descricao = document.createElement("p");

        descricao.textContent = produto.descricao;

        /* Quantidade */

        const quantidade = document.createElement("small");

        quantidade.textContent =
            `Quantidade: ${produto.quantidade}`;

        cartao.append(
            imagem,
            nome,
            descricao,
            quantidade
        );

        if (avaliacaoExistente) {

            mostrarAvaliacaoEnviada(
                cartao,
                avaliacaoExistente
            );

        } else {

            criarFormulario(
                cartao,
                produto,
                indice,
                pedido
            );

        }

        lista.appendChild(cartao);

    });

}


/* ========================================
   8. FORMULÁRIO DE AVALIAÇÃO
======================================== */

function criarFormulario(cartao, produto, indice, pedido) {

    let notaSelecionada = 0;

    const formulario = document.createElement("form");

    formulario.className = "formulario-avaliacao";

    /* Título */

    const titulo = document.createElement("h4");

    titulo.textContent = "Como você avalia este produto?";

    /* Grupo de estrelas */

    const grupoEstrelas = document.createElement("fieldset");

    grupoEstrelas.className = "estrelas-avaliacao";

    const legenda = document.createElement("legend");

    legenda.textContent = "Selecione sua nota:";

    grupoEstrelas.appendChild(legenda);

    const estrelas = [];

    for (let i = 1; i <= 5; i++) {

        const botao = document.createElement("button");

        botao.type = "button";

        botao.className = "estrela";

        botao.textContent = "★";

        botao.setAttribute("aria-label", `${i} estrelas`);

        botao.setAttribute("aria-pressed", "false");

        botao.addEventListener("click", () => {

            notaSelecionada = i;

            estrelas.forEach((estrela, posicao) => {

                const selecionada = posicao < i;

                estrela.classList.toggle(
                    "selecionada",
                    selecionada
                );

                estrela.setAttribute(
                    "aria-pressed",
                    String(posicao + 1 === i)
                );

            });

            textoNota.textContent = `${i} de 5 estrelas`;

        });

        estrelas.push(botao);

        grupoEstrelas.appendChild(botao);

    }

    /* Texto da nota */

    const textoNota = document.createElement("p");

    textoNota.className = "texto-nota";

    textoNota.textContent = "Nenhuma estrela selecionada";

    /* Comentário */

    const rotuloComentario = document.createElement("label");

    rotuloComentario.textContent =
        "Conte como foi sua experiência:";

    const comentario = document.createElement("textarea");

    comentario.id = `comentario-${indice}`;

    comentario.name = "comentario";

    comentario.placeholder =
        "Escreva seu comentário sobre este produto...";

    comentario.rows = 4;

    comentario.maxLength = 500;

    rotuloComentario.htmlFor = comentario.id;

    /* Botão de envio */

    const botaoEnviar = document.createElement("button");

    botaoEnviar.type = "submit";

    botaoEnviar.className = "botao-enviar-avaliacao";

    botaoEnviar.textContent = "Enviar avaliação";

    /* Salvar avaliação */

    formulario.addEventListener("submit", (evento) => {

        evento.preventDefault();

        if (notaSelecionada === 0) {

            alert("Selecione uma quantidade de estrelas.");

            return;

        }

        /* Conferir novamente o pedido */

        const pedidosAtuais = carregarPedidos();

        const pedidoAtual = pedidosAtuais.find(
            p => String(p.id) === String(pedido.id)
        );

        if (!pedidoAtual || pedidoAtual.status !== "Entregue") {

            alert("Este pedido não está disponível para avaliação.");

            return;

        }

        const avaliacoes = carregarAvaliacoes();

        const jaAvaliado = avaliacoes.some(a =>
            String(a.pedidoId) === String(pedido.id) &&
            a.produtoIndice === indice
        );

        if (jaAvaliado) {

            alert("Este produto já foi avaliado.");

            renderizarProdutos(pedidoAtual);

            return;

        }

        const novaAvaliacao = {

            pedidoId: pedido.id,

            produtoIndice: indice,

            produtoNome: produto.nome,

            estrelas: notaSelecionada,

            comentario: comentario.value.trim(),

            data: new Date().toLocaleDateString("pt-BR")

        };

        avaliacoes.push(novaAvaliacao);

        salvarAvaliacoes(avaliacoes);

        alert("Sua avaliação foi enviada com sucesso! 💗");

        renderizarProdutos(pedidoAtual);

    });

    formulario.append(
        titulo,
        grupoEstrelas,
        textoNota,
        rotuloComentario,
        comentario,
        botaoEnviar
    );

    cartao.appendChild(formulario);

}


/* ========================================
   9. MOSTRAR AVALIAÇÃO ENVIADA
======================================== */

function mostrarAvaliacaoEnviada(cartao, avaliacao) {

    const titulo = document.createElement("h4");

    titulo.textContent = "Avaliação enviada!";

    const estrelas = document.createElement("p");

    estrelas.className = "estrelas-enviadas";

    estrelas.textContent =
        "★".repeat(avaliacao.estrelas) +
        "☆".repeat(5 - avaliacao.estrelas);

    const comentario = document.createElement("p");

    comentario.textContent =
        avaliacao.comentario || "Sem comentário.";

    const data = document.createElement("small");

    data.textContent = `Avaliado em ${avaliacao.data}`;

    cartao.append(
        titulo,
        estrelas,
        comentario,
        data
    );

}


/* ========================================
   10. INICIAR TELA
======================================== */

iniciarTela();
