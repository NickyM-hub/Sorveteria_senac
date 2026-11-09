
// Seleciona os botões de filtros
const botoesFiltro = document.querySelectorAll(".filtro");

// Seleciona todos os cartões de cupons
const cupons = document.querySelectorAll(".card-cupom");

// Percorre os botões
botoesFiltro.forEach(botao => {

    botao.addEventListener("click", () => {

        // Remove a seleção dos outros botões
        botoesFiltro.forEach(item => {
            item.classList.remove("ativo");
        });

        // Ativa o botão clicado
        botao.classList.add("ativo");

        // Descobre qual filtro foi selecionado
        const filtroSelecionado = botao.dataset.filtro;

        // Data atual
        const hoje = new Date();
        hoje.setHours(0, 0, 0, 0);

        // Percorre os cupons
        cupons.forEach(cupom => {

            // Obtém a validade do cupom
            const dataValidade = cupom.dataset.validade;

            const partes = dataValidade.split("-");

            const validade = new Date(
                Number(partes[0]),
                Number(partes[1]) - 1,
                Number(partes[2])
            );

            // Verifica a situação do cupom
            const estaAtivo = validade >= hoje;

            // Aplica o filtro
            if (filtroSelecionado === "todos") {

                cupom.hidden = false;

            } else if (filtroSelecionado === "ativos") {

                cupom.hidden = !estaAtivo;

            } else if (filtroSelecionado === "expirados") {

                cupom.hidden = estaAtivo;

            }

        });

    });

});
