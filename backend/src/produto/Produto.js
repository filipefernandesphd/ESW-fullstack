class Produto {

  constructor(nome, descricao, preco, estoque) {
    if (!nome || typeof nome !== "string") {
      throw new Error("Nome inválido");
    }
    if (typeof preco !== "number" || preco < 0) {
      throw new Error("Preço inválido");
    }
    if (!Number.isInteger(estoque) || estoque < 0) {
      throw new Error("Estoque inválido");
    }

    this.nome = nome;
    this.descricao = descricao;
    this.preco = preco;
    this.estoque = estoque;
  }

  aumentarEstoque(qtd) {
    if (!Number.isInteger(qtd) || qtd <= 0) {
      throw new Error("Quantidade inválida para aumentar estoque");
    }
    this.estoque += qtd;
  }

  diminuirEstoque(qtd) {
    if (!Number.isInteger(qtd) || qtd <= 0) {
      throw new Error("Quantidade inválida para diminuir estoque");
    }
    if (qtd > this.estoque) {
      throw new Error("Estoque insuficiente");
    }
    this.estoque -= qtd;
  }
}

module.exports = Produto;