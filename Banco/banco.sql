CREATE DATABASE SorveteriaSenac
USE SorveteriaSenac

CREATE TABLE tb_cliente (
	id_cliente INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) UNIQUE NOT NULL,
    nome_cliente VARCHAR(255),
    data_nascimento DATE,
    telefone NUMERIC,
    senha VARCHAR(250)
);

CREATE TABLE tb_funcionario(
	id_usuario INT PRIMARY KEY AUTO_INCREMENT,
    cnpj CHAR(50) UNIQUE NOT NULL,
    nome_funcionario VARCHAR(255),
    cargo ENUM('Gerente',  )
);