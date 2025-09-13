class Produto {

    constructor(nome, descricao, preco, estoque){
        this.nome = nome;
        this.descricao = descricao;
        this.preco = preco;
        this.estoque = estoque;
    }

    aumentarEstoque(qtd){
        this.estoque += qtd;
    }

    diminuirEstoque(qtd){
        this.estoque -= qtd;
    }
}

module.exports = Produto;