
"use strict";

// ==========================================
// 1. CATÁLOGO DE BEBIDAS
// ==========================================

const catalogoBebidas = {

    "Milk-shake Oreo": {
        imagem: "imagens/milkshake-oreo.png",
        descricao: "Cremoso e delicioso!",
        nota: "5,0",
        precos: { 400: 15.50 }
    },

    "Coca-Cola": {
        imagem: "imagens/coca-cola.png",
        descricao: "Refrigerante gelado!",
        nota: "4,8",
        precos: { 350: 3.90 }
    },

    "Água Mineral": {
        imagem: "imagens/agua-mineral.png",
        descricao: "Clássica e deliciosa!",
        nota: "4,7",
        precos: { 500: 2.00 }
    },

    "Milk-shake Caramelo": {
        imagem: "imagens/milkshake-caramelo.png",
        descricao: "Três sabores em um só!",
        nota: "4,9",
        precos: { 500: 21.00 }
    },

    "Milk-shake Morango": {
        imagem: "imagens/milkshake-morango.png",
        descricao: "Delicioso e cheio de sabor!",
        nota: "4,8",
        precos: { 400: 18.50 }
    },

    "Milk-shake Ovomaltine": {
        imagem: "imagens/milkshake-ovomaltine.png",
        descricao: "Crocante e muito cremoso!",
        nota: "4,9",
        precos: { 400: 19.50 }
    },

    "Milk-shake Ninho": {
        imagem: "imagens/milkshake-ninho.png",
        descricao: "Suave, doce e irresistível!",
        nota: "4,8",
        precos: { 500: 20.00 }
    },

    "Milk-shake Paçoca": {
        imagem: "imagens/milkshake-pacoca.png",
        descricao: "Uma combinação deliciosa!",
        nota: "4,9",
        precos: { 400: 19.00 }
    }

};


// ==========================================
// 2. LINKS DOS PRODUTOS
// ==========================================

const produtosBebidasPorSlug = {

    "milkshake-oreo": "Milk-shake Oreo",
    "coca-cola": "Coca-Cola",
    "agua-mineral": "Água Mineral",
    "milkshake-caramelo": "Milk-shake Caramelo",
    "milkshake-morango": "Milk-shake Morango",
    "milkshake-ovomaltine": "Milk-shake Ovomaltine",
    "milkshake-ninho": "Milk-shake Ninho",
    "milkshake-pacoca": "Milk-shake Paçoca"

};


// ==========================================
// 3. IDENTIFICA O PRODUTO PELA URL
// ==========================================

const parametrosBebidas =
    new URLSearchParams(window.location.search);

const slugBebida = parametrosBebidas.get("produto");
const nomeBebida = parametrosBebidas.get("nome");

const produtoSelecionadoBebida =
    nomeBebida || produtosBebidasPorSlug[slugBebida];

const bebida = produtoSelecionadoBebida
    ? catalogoBebidas[produtoSelecionadoBebida]
    : null;


// ==========================================
// 4. REDIRECIONA PARA OS DETALHES
// ==========================================

if (!bebida) {

    alert("Bebida não encontrada.");

    window.location.replace("inicio.html");

} else {

    const urlDetalhes =
        "detalhes-bebida.html?nome=" +
        encodeURIComponent(produtoSelecionadoBebida);

    console.log("Produto selecionado:", produtoSelecionadoBebida);
    console.log("Abrir:", urlDetalhes);

}
