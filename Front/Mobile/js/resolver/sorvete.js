
"use strict";

// ==========================================
// 1. CATÁLOGO DE SORVETES E SUNDAES
// ==========================================

const catalogoSorvetes = {

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


// ==========================================
// 2. LINKS DOS PRODUTOS
// ==========================================

const produtosSorvetesPorSlug = {

    "sorvete-chocolate": "Sorvete Chocolate",
    "sorvete-morango": "Sorvete Morango",
    "sorvete-baunilha": "Sorvete Baunilha",
    "sorvete-flocos": "Sorvete Flocos",
    "sorvete-napolitano": "Sorvete Napolitano",
    "sorvete-coco": "Sorvete Coco",

    "sundae-morango": "Sundae Morango",
    "sundae-chocolate": "Sundae Chocolate",
    "sundae-caramelo": "Sundae Caramelo",
    "sundae-especial": "Sundae Especial"

};


// ==========================================
// 3. IDENTIFICA O PRODUTO PELA URL
// ==========================================

const parametrosSorvetes =
    new URLSearchParams(window.location.search);

const slugSorvete = parametrosSorvetes.get("produto");
const nomeSorvete = parametrosSorvetes.get("nome");

const produtoSelecionadoSorvete =
    nomeSorvete || produtosSorvetesPorSlug[slugSorvete];

const sorvete = produtoSelecionadoSorvete
    ? catalogoSorvetes[produtoSelecionadoSorvete]
    : null;


// ==========================================
// 4. REDIRECIONA PARA OS DETALHES
// ==========================================

if (!sorvete) {

    alert("Sorvete não encontrado.");

    window.location.replace("inicio.html");

} else {

    const urlDetalhes =
        "detalhes-produto.html?nome=" +
        encodeURIComponent(produtoSelecionadoSorvete);

    // A identificação fica disponível para a tela de detalhes.
    console.log("Produto selecionado:", produtoSelecionadoSorvete);
    console.log("Abrir:", urlDetalhes);

}
