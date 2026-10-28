/*
    JavaScript das telas de pedidos.
    Os dados abaixo são exemplos para testar a navegação.
    O status atualizado fica salvo no navegador com localStorage.
*/
const PEDIDOS_PADRAO = [
    {
        id: "10111",
        data: "28/10/2026 - 14:22",
        status: "Em preparação",
        endereco: "Rua das Flores, 321 - Embu das Artes - SP",
        pagamento: "Pago via PIX",
        frete: 0,
        desconto: 0,
        produtos: [
            { nome: "Sorvete Chocolate", descricao: "500 ml • Calda de chocolate", imagem: "imagens/sorvete-chocolate.png", quantidade: 1, preco: 17.70 },
            { nome: "Milk-shake Oreo", descricao: "400 ml • Adicional de chocolate", imagem: "imagens/milkshake-oreo.png", quantidade: 1, preco: 19.90 }
        ]
    },
    {
        id: "10110",
        data: "27/10/2026 - 18:05",
        status: "Saiu para entrega",
        endereco: "Rua das Flores, 321 - Embu das Artes - SP",
        pagamento: "Pago via PIX",
        frete: 5,
        desconto: 0,
        produtos: [
            { nome: "Açaí", descricao: "500 ml • Banana e granola", imagem: "imagens/acai.png", quantidade: 1, preco: 19.90 }
        ]
    },
    {
        id: "10109",
        data: "26/10/2026 - 12:40",
        status: "Entregue",
        endereco: "Rua das Flores, 321 - Embu das Artes - SP",
        pagamento: "Pago via PIX",
        frete: 4,
        desconto: 2,
        produtos: [
            { nome: "Sorvete Flocos", descricao: "350 ml", imagem: "imagens/sorvete-flocos.png", quantidade: 1, preco: 14.90 }
        ]
    }
];

function carregarPedidos() {
    try {
        const salvos = localStorage.getItem("sorveteria_pedidos");
        if (salvos) return JSON.parse(salvos);
        localStorage.setItem("sorveteria_pedidos", JSON.stringify(PEDIDOS_PADRAO));
    } catch (erro) {
        console.warn("Não foi possível acessar os pedidos salvos.", erro);
    }
    return PEDIDOS_PADRAO.map(p => ({ ...p, produtos: p.produtos.map(prod => ({ ...prod })) }));
}

function salvarPedidos(pedidos) {
    try {
        localStorage.setItem("sorveteria_pedidos", JSON.stringify(pedidos));
    } catch (erro) {
        console.warn("Não foi possível salvar os pedidos.", erro);
    }
}

function pedidoAtual() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id") || localStorage.getItem("sorveteria_pedido_selecionado") || "10111";
    const pedidos = carregarPedidos();
    return pedidos.find(p => String(p.id) === String(id)) || pedidos[0];
}

function dinheiro(valor) {
    return Number(valor || 0).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function totalProdutos(pedido) {
    return pedido.produtos.reduce((soma, produto) => soma + produto.preco * produto.quantidade, 0);
}

function totalPedido(pedido) {
    return totalProdutos(pedido) + Number(pedido.frete || 0) - Number(pedido.desconto || 0);
}

function classeStatus(status) {
    if (status === "Entregue") return "status-entregue";
    if (status === "Cancelado") return "status-cancelado";
    if (status === "Saiu para entrega") return "status-entrega";
    return "status-preparando";
}

function pedidosEmAndamento(pedido) {
    return pedido.status === "Em preparação" || pedido.status === "Saiu para entrega";
}

function renderizarLista() {
    const lista = document.getElementById("listaPedidos");
    if (!lista) return;

    const pedidos = carregarPedidos();
    const filtroAtual = document.querySelector(".aba-pedido.ativa")?.dataset.filtro || "todos";
    const filtrados = pedidos.filter(p => {
        if (filtroAtual === "andamento") return pedidosEmAndamento(p);
        if (filtroAtual === "finalizados") return !pedidosEmAndamento(p);
        return true;
    });

    lista.innerHTML = "";
    filtrados.forEach(pedido => {
        const primeiroProduto = pedido.produtos[0];
        const card = document.createElement("a");
        card.className = "cartao-lista-pedido";
        card.href = `detalhes-pedido.html?id=${encodeURIComponent(pedido.id)}`;
        card.addEventListener("click", () => {
            localStorage.setItem("sorveteria_pedido_selecionado", pedido.id);
        });

        const img = document.createElement("img");
        img.className = "miniatura-pedido";
        img.src = primeiroProduto.imagem;
        img.alt = primeiroProduto.nome;
        img.onerror = () => { img.style.display = "none"; };

        const info = document.createElement("div");
        info.className = "info-lista-pedido";
        const titulo = document.createElement("strong");
        titulo.textContent = `Pedido #${pedido.id}`;
        const data = document.createElement("small");
        data.textContent = pedido.data;
        const valor = document.createElement("b");
        valor.textContent = dinheiro(totalPedido(pedido));
        info.append(titulo, data, valor);

        const lado = document.createElement("div");
        lado.className = "lado-pedido";
        const status = document.createElement("span");
        status.className = `etiqueta-status ${classeStatus(pedido.status)}`;
        status.textContent = pedido.status;
        const seta = document.createElement("span");
        seta.className = "seta-pedido";
        seta.textContent = "›";
        lado.append(status, seta);

        card.append(img, info, lado);
        lista.appendChild(card);
    });

    const vazio = document.getElementById("mensagemVazia");
    if (vazio) vazio.hidden = filtrados.length > 0;
}

function configurarAbas() {
    document.querySelectorAll(".aba-pedido").forEach(botao => {
        botao.addEventListener("click", () => {
            document.querySelectorAll(".aba-pedido").forEach(aba => aba.classList.remove("ativa"));
            botao.classList.add("ativa");
            renderizarLista();
        });
    });
}

function renderizarDetalhes() {
    const container = document.getElementById("detalheProdutos");
    if (!container) return;

    const pedido = pedidoAtual();
    document.getElementById("detalheNumero").textContent = `Pedido #${pedido.id}`;
    document.getElementById("detalheData").textContent = pedido.data;
    document.getElementById("detalheEndereco").textContent = pedido.endereco;
    document.getElementById("detalhePagamento").textContent = pedido.pagamento;
    document.getElementById("detalheSubtotal").textContent = dinheiro(totalProdutos(pedido));
    document.getElementById("detalheFrete").textContent = dinheiro(pedido.frete);
    document.getElementById("detalheDesconto").textContent = dinheiro(pedido.desconto);
    document.getElementById("detalheTotal").textContent = dinheiro(totalPedido(pedido));

    const status = document.getElementById("detalheStatus");
    status.textContent = pedido.status;
    status.className = `etiqueta-status ${classeStatus(pedido.status)}`;

    container.innerHTML = "";
    pedido.produtos.forEach(produto => {
        const linha = document.createElement("article");
        linha.className = "produto-detalhe-pedido";

        const img = document.createElement("img");
        img.src = produto.imagem;
        img.alt = produto.nome;
        img.onerror = () => { img.style.display = "none"; };

        const info = document.createElement("div");
        info.className = "produto-detalhe-info";
        const nome = document.createElement("strong");
        nome.textContent = produto.nome;
        const descricao = document.createElement("small");
        descricao.textContent = produto.descricao;
        const quantidade = document.createElement("small");
        quantidade.textContent = `Quantidade: ${produto.quantidade}`;
        const preco = document.createElement("b");
        preco.textContent = dinheiro(produto.preco * produto.quantidade);
        info.append(nome, descricao, quantidade, preco);
        linha.append(img, info);
        container.appendChild(linha);
    });

    const podeCancelar = pedido.status === "Em preparação";
    const botaoCancelar = document.getElementById("botaoCancelar");
    if (botaoCancelar) {
        botaoCancelar.hidden = !podeCancelar;
        botaoCancelar.href = `cancelar-pedido.html?id=${encodeURIComponent(pedido.id)}`;
    }
}

function configurarCancelamento() {
    const botao = document.getElementById("confirmarCancelamento");
    if (!botao) return;

    const pedido = pedidoAtual();
    const voltarDetalhes = `detalhes-pedido.html?id=${encodeURIComponent(pedido.id)}`;
    document.getElementById("voltarDetalhes").href = voltarDetalhes;
    document.getElementById("voltarSemCancelar").href = voltarDetalhes;
    document.getElementById("cancelarNumero").textContent = `#${pedido.id}`;
    document.getElementById("cancelarTotal").textContent = dinheiro(totalPedido(pedido));

    botao.addEventListener("click", () => {
        const pedidos = carregarPedidos();
        const indice = pedidos.findIndex(p => String(p.id) === String(pedido.id));
        if (indice === -1) {
            window.location.href = "meus-pedidos.html";
            return;
        }
        if (pedidos[indice].status !== "Em preparação") {
            alert("Este pedido não pode mais ser cancelado.");
            window.location.href = voltarDetalhes;
            return;
        }
        pedidos[indice].status = "Cancelado";
        salvarPedidos(pedidos);
        localStorage.setItem("sorveteria_pedido_selecionado", pedido.id);
        window.location.href = `pedido-cancelado.html?id=${encodeURIComponent(pedido.id)}`;
    });
}

function renderizarPedidoCancelado() {
    const numero = document.getElementById("canceladoNumero");
    if (!numero) return;
    const pedido = pedidoAtual();
    numero.textContent = `#${pedido.id}`;
    document.getElementById("canceladoTotal").textContent = dinheiro(totalPedido(pedido));
}

document.addEventListener("DOMContentLoaded", () => {
    configurarAbas();
    renderizarLista();
    renderizarDetalhes();
    configurarCancelamento();
    renderizarPedidoCancelado();
});
