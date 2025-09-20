const Produto = require("../produto/Produto");

class Carrinho {
    constructor() {
        this.itens = []; // cada item: { produto, qtd }
    }

    adicionar(produto, qtd = 1) {
        if (!produto || (Object.getPrototypeOf(produto).constructor.name !== "Produto")) {
            throw new Error("Item inválido");
        }
        if (!Number.isInteger(qtd) || qtd <= 0) {
            throw new Error("Quantidade inválida");
        }

        const existente = this.itens.find(i => i.produto.nome === produto.nome);
        if (existente) {
            existente.qtd += qtd;
        } else {
            this.itens.push({ produto, qtd });
        }
    }

    remover(nomeProduto) {
        const index = this.itens.findIndex(i => i.produto.nome === nomeProduto);
        if (index === -1) throw new Error("Produto não encontrado no carrinho");
        this.itens.splice(index, 1);
    }

    total() {
        return this.itens.reduce((soma, i) => soma + i.produto.preco * i.qtd, 0);
    }

    limpar() {
        this.itens = [];
    }
}

module.exports = Carrinho;