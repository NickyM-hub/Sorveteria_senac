CREATE DATABASE SorveteriaSenac
USE SorveteriaSenac

CREATE TABLE tb_pais (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome_pais VARCHAR(100) NOT NULL,
    sigla_pais CHAR(8)
);

CREATE TABLE tb_estado (
    id INT PRIMARY KEY AUTO_INCREMENT,
    id_pais INT NOT NULL,
    nome_estado VARCHAR(100) NOT NULL,
    sigla_estado CHAR(4) NOT NULL UNIQUE,
    
    FOREIGN KEY (id_pais) REFERENCES tb_pais(id),
    UNIQUE (nome_estado, id_pais)
);

CREATE TABLE tb_cidade (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome_cidade VARCHAR(100) NOT NULL,
    id_estado INT NOT NULL,

    FOREIGN KEY (id_estado) REFERENCES tb_estado(id),
    UNIQUE (nome_cidade, id_estado)
);

CREATE TABLE tb_bairro (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome_bairro VARCHAR(100) NOT NULL,
    id_cidade INT NOT NULL,

    FOREIGN KEY (id_cidade) REFERENCES tb_cidade(id),
    UNIQUE (nome_bairro, id_cidade)
);

CREATE TABLE tb_endereco (
    id INT PRIMARY KEY AUTO_INCREMENT,
    cep CHAR(9) NOT NULL,
    logradouro VARCHAR(255) NOT NULL,
    numero VARCHAR(10) NOT NULL,
    complemento VARCHAR(100),
    id_bairro INT NOT NULL,

    FOREIGN KEY (id_bairro) REFERENCES tb_bairro(id)
);


CREATE TABLE tb_cargo(
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome_cargo VARCHAR(255) NOT NULL
);

CREATE TABLE tb_categoria(
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome_categoria VARCHAR(255) NOT NULL
);

CREATE TABLE tb_unidade_medida(
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome_unidade_medida VARCHAR(50) NOT NULL
);


CREATE TABLE tb_cliente (
	id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) UNIQUE NOT NULL,
    nome_cliente VARCHAR(255),
    dn_cliente DATE,
    telefone VARCHAR(20),
    senha VARCHAR(250)
);


CREATE TABLE tb_funcionario(
	id INT PRIMARY KEY AUTO_INCREMENT,
    cpf CHAR(18) UNIQUE NOT NULL,
    nome_funcionario VARCHAR(255),
    id_cargo INT NOT NULL,
    telefone NUMERIC,
    email VARCHAR(255) UNIQUE NOT NULL,
    senha VARCHAR(250),
    dn_funcionario DATE,
    FOREIGN KEY (id_cargo) REFERENCES tb_cargo(id)
);

CREATE TABLE tb_admin(
	id INT PRIMARY KEY AUTO_INCREMENT,
    cnpj CHAR(18) UNIQUE NOT NULL,
    nome_funcionario VARCHAR(255),
    id_cargo INT NOT NULL,
    telefone NUMERIC,
    email VARCHAR(255) UNIQUE NOT NULL,
    senha VARCHAR(250),
    dn_funcionario DATE,
    FOREIGN KEY (id_cargo) REFERENCES tb_cargo(id)
);

CREATE TABLE tb_produto(
    id INT PRIMARY KEY AUTO_INCREMENT,
    id_categoria INT NOT NULL,
    id_unidade_medida INT NOT NULL,
    nome_produto VARCHAR(255) NOT NULL,
    preco_produto DECIMAL(10,2) NOT NULL,
    descricao_produto VARCHAR(255),
    qnt_estoque INT NOT NULL,
    img_produto MEDIUMBLOB,
    disponivel_produto BOOLEAN NOT NULL,
    FOREIGN KEY (id_categoria) REFERENCES tb_categoria(id),
    FOREIGN KEY (id_unidade_medida) REFERENCES tb_unidade_medida(id)
);

CREATE TABLE tb_pedido(
    id_pedido INT PRIMARY KEY AUTO_INCREMENT,
    id_cliente INT NOT NULL,
    data_pedido DATETIME NOT NULL,
    quantidade INT NOT NULL,
    preco_total DECIMAL(10,2) NOT NULL,
    status_pedido ENUM('Pendente', 'Em andamento', 'Concluído', 'Cancelado') NOT NULL,
    FOREIGN KEY (id_cliente) REFERENCES tb_cliente(id)
);

CREATE TABLE produto_pedido(
    id_produto INT NOT NULL,
    id_pedido INT NOT NULL,
    quantidade INT NOT NULL,
    preco_produto DECIMAL(10,2) NOT NULL,
    PRIMARY KEY (id_produto, id_pedido),
    FOREIGN KEY (id_produto) REFERENCES tb_produto(id),
    FOREIGN KEY (id_pedido) REFERENCES tb_pedido(id_pedido)
);

