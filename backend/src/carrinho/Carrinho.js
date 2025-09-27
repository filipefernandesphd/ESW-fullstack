const Produto = require("../produto/Produto");
const axios = require("axios");

class Carrinho {
    constructor() {
        this.itens = []; // cada item: { produto, qtd }
        this.valorFrete = 0;
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

    async calcularFrete(cep) {
        const { data } = await axios.get(`https://viacep.com.br/ws/${cep}/json`);

        if (data.erro) {
            throw new Error("CEP inválido");
        }

        // tabela fixa de preços por região
        const precos = {
            "Norte": 50,
            "Nordeste": 40,
            "Centro-Oeste": 30,
            "Sudeste": 20,
            "Sul": 25
        };

        const preco = precos[data.regiao];

        this.valorFrete = preco;
        return preco;
    }

    total() {
        return this.itens.reduce((soma, i) => soma + i.produto.preco * i.qtd, 0) + this.valorFrete;
    }

    limpar() {
        this.itens = [];
        this.valorFrete = 0;
    }
}

module.exports = Carrinho;