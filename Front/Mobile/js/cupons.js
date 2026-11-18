
"use strict";

// ========================================
// 1. ARMAZENAMENTO DOS CUPONS UTILIZADOS
// ========================================

function carregarCuponsUtilizados() {
    return JSON.parse(
        localStorage.getItem("cupons_utilizados") || "[]"
    );
}

function salvarCuponsUtilizados(cupons) {
    localStorage.setItem(
        "cupons_utilizados",
        JSON.stringify(cupons)
    );
}

// ========================================
// 2. REGISTRAR UTILIZAÇÃO DO CUPOM
// ========================================

window.registrarUsoCupom = function(codigo) {

    const utilizados = carregarCuponsUtilizados();

    codigo = codigo.toUpperCase();

    if (utilizados.includes(codigo)) {
        return false;
    }

    utilizados.push(codigo);

    salvarCuponsUtilizados(utilizados);

    return true;
};

// ========================================
// 3. VERIFICAR SE O CUPOM ESTÁ DISPONÍVEL
// ========================================

function cupomEstaDisponivel(cupom) {

    const codigo = cupom.dataset.codigo;

    const utilizados = carregarCuponsUtilizados();

    const partes = cupom.dataset.validade.split("-");

    const validade = new Date(
        Number(partes[0]),
        Number(partes[1]) - 1,
        Number(partes[2])
    );

    validade.setHours(23, 59, 59, 999);

    const hoje = new Date();

    return !utilizados.includes(codigo) &&
           validade >= hoje;
}

// ========================================
// 4. CRIAR BOTÕES DE COPIAR
// ========================================

const cupons = document.querySelectorAll(".card-cupom");

cupons.forEach(cupom => {

    const codigo = cupom.dataset.codigo;

    const info = cupom.querySelector(".informacoes-cupom");

    const botao = document.createElement("button");

    botao.type = "button";
    botao.className = "botao-copiar-cupom";
    botao.textContent = "Copiar código";

    botao.addEventListener("click", async () => {

        if (!cupomEstaDisponivel(cupom)) {
            alert("Este cupom não está mais disponível.");
            atualizarCupons();
            return;
        }

        try {

            await navigator.clipboard.writeText(codigo);

            botao.textContent = "Código copiado!";

            setTimeout(() => {
                botao.textContent = "Copiar código";
            }, 2000);

        } catch (erro) {

            alert("Não foi possível copiar o código.");

        }

    });

    info.appendChild(botao);

});

// ========================================
// 5. ATUALIZAR SITUAÇÃO DOS CUPONS
// ========================================

function atualizarCupons() {

    cupons.forEach(cupom => {

        const disponivel = cupomEstaDisponivel(cupom);

        cupom.classList.toggle("cupom-expirado", !disponivel);

        const botao = cupom.querySelector(".botao-copiar-cupom");

        if (botao) {

            botao.disabled = !disponivel;

            botao.textContent = disponivel
                ? "Copiar código"
                : "Cupom expirado";

        }

    });

}

// ========================================
// 6. FILTROS
// ========================================

const botoesFiltro = document.querySelectorAll(".filtro");

botoesFiltro.forEach(botao => {

    botao.addEventListener("click", () => {

        botoesFiltro.forEach(item => {
            item.classList.remove("ativo");
        });

        botao.classList.add("ativo");

        const filtro = botao.dataset.filtro;

        cupons.forEach(cupom => {

            const disponivel = cupomEstaDisponivel(cupom);

            if (filtro === "todos") {
                cupom.hidden = false;
            }

            else if (filtro === "ativos") {
                cupom.hidden = !disponivel;
            }

            else if (filtro === "expirados") {
                cupom.hidden = disponivel;
            }

        });

    });

});

atualizarCupons();
