
const tamanho = document.getElementById("tamanho-chocolate");
const preco = document.getElementById("preco-chocolate");
const adicionar = document.getElementById("adicionar-chocolate");

tamanho.addEventListener("change", function () {
    const opcao = tamanho.options[tamanho.selectedIndex];
    const valor = Number(opcao.dataset.preco);

    preco.textContent = valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
});

adicionar.addEventListener("click", function (event) {
    const opcao = tamanho.options[tamanho.selectedIndex];

    const produto = {
        nome: "Sorvete Chocolate",
        tamanho: opcao.value,
        preco: Number(opcao.dataset.preco)
    };

    localStorage.setItem("produtoSelecionado", JSON.stringify(produto));
});
