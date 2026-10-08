CREATE DATABASE SorveteriaSenac
USE SorveteriaSenac

CREATE tb_cargo(
    id_cargo INT PRIMARY KEY AUTO_INCREMENT,
    nome_cargo VARCHAR(255) NOT NULL
);

CREATE TABLE tb_categoria(
    id_categoria INT PRIMARY KEY AUTO_INCREMENT,
    nome_categoria VARCHAR(255) NOT NULL
);

CREATE TABLE tb_unidade_medida(
    id_unidade_medida INT PRIMARY KEY AUTO_INCREMENT,
    nome_unidade_medida VARCHAR(50) NOT NULL
);


CREATE TABLE tb_cliente (
	id_cliente INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) UNIQUE NOT NULL,
    nome_cliente VARCHAR(255),
    dn_cliente DATE,
    telefone NUMERIC,
    senha_cliente VARCHAR(250)
);

CREATE TABLE tb_funcionario(
	id_usuario INT PRIMARY KEY AUTO_INCREMENT,
    cnpj CHAR(50) UNIQUE NOT NULL,
    nome_funcionario VARCHAR(255),
    id_cargo INT NOT NULL,
    telefone NUMERIC,
    email VARCHAR(255) UNIQUE NOT NULL,
    senha_funcionario VARCHAR(250),
    dn_funcionario DATE
);

CREATE TABLE tb_produto(
    id_produto INT PRIMARY KEY AUTO_INCREMENT,
    id_categoria INT NOT NULL,
    id_unidade_medida INT NOT NULL,
    nome_produto VARCHAR(255) NOT NULL,
    preco_produto DECIMAL(10,2) NOT NULL,
    descricao_produto VARCHAR(255),
    qnt_estoque INT NOT NULL,
    img_produto MEDIUMBLOB,
    disponivel_produto BOOLEAN NOT NULL,
    unidade_medida INT NOT NULL,
    FOREIGN KEY (id_categoria) REFERENCES tb_categoria(id_categoria),
    FOREIGN KEY (id_unidade_medida) REFERENCES tb_unidade_medida(id_unidade_medida)
);

CREATE TABLE tb_pedido(
    id_pedido INT PRIMARY KEY AUTO_INCREMENT,
    id_cliente INT NOT NULL,
    data_pedido DATETIME NOT NULL,
    quantidade INT NOT NULL,
    preco_total DECIMAL(10,2) NOT NULL,
    status_pedido ENUM('Pendente', 'Em andamento', 'Concluído', 'Cancelado') NOT NULL,
    FOREIGN KEY (id_cliente) REFERENCES tb_cliente(id_cliente),
    FOREIGN KEY (id_produto) REFERENCES tb_produto(id_produto)
);

CREATE TABLE produto_pedido(
    id_produto INT NOT NULL,
    id_pedido INT NOT NULL,
    quantidade INT NOT NULL,
    preco_produto DECIMAL(10,2) NOT NULL,
    PRIMARY KEY (id_produto, id_pedido),
    FOREIGN KEY (id_produto) REFERENCES tb_produto(id_produto),
    FOREIGN KEY (id_pedido) REFERENCES tb_pedido(id_pedido)
);