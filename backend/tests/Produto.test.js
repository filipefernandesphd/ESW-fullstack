const Produto = require("../src/produto/Produto");

describe("Produto", () => {

  // Criar produto
  it("deve deve ser criado com os atributos corretos", () => {
    const p = new Produto("Camisa", "Camisa azul", 79.9, 10);

    expect(p.nome).toBe("Camisa");
    expect(p.descricao).toBe("Camisa azul");
    expect(p.preco).toBe(79.9);
    expect(p.estoque).toBe(10);
  });


  // Nome é inválido: não definido
  it("deve lançar erro se nome for não for definido", () => {
    expect(() => new Produto("", "Desc", 50, 5))
      .toThrow("Nome inválido");
  });

  // Nome é inválido: não é string
  it("deve lançar erro se nome for não for string", () => {
    expect(() => new Produto(123, "Desc", 50, 5))
      .toThrow("Nome inválido");
  });


  // Preço é inválido: não é um número
  it("deve lançar erro se preço não for um número", () => {
    expect(() => new Produto("Camisa", "Camisa azul", true, 10))
      .toThrow("Preço inválido");
  });

  // Preço é inválido: valor é negativo
  it("deve lançar erro se preço for negativo", () => {
    expect(() => new Produto("Camisa", "Camisa azul", -50, 10))
      .toThrow("Preço inválido");
  });


  // Estoque é inválido: não é um número
  it("deve lançar erro se estoque não for um número", () => {
    expect(() => new Produto("Camisa", "Camisa azul", 50, false))
      .toThrow("Estoque inválido");
  });

  // Estoque é inválido: valor é negativo
  it("deve lançar erro se estoque for negativo", () => {
    expect(() => new Produto("Camisa", "Camisa azul", 50, -10))
      .toThrow("Estoque inválido");
  });

  // Aumento de estoque válido
  it("deve aumentar o estoque corretamente", () => {
    const p = new Produto("Calça", "Calça jeans", 129.9, 5);

    p.aumentarEstoque(3);

    expect(p.estoque).toBe(8);
  });

  // Aumento de estoque é inválido: o valor não é um número inteiro
  it("deve lançar erro se não for um número inteiro para aumentar o estoque", () => {
    const p = new Produto("Calça", "Calça jeans", 129.9, 5)
    expect(() => p.aumentarEstoque(true))
      .toThrow("Quantidade inválida para aumentar estoque");
  });

  // Aumento de estoque é inválido: o valor é negativo
  it("deve lançar erro se for um número negativo para aumentar o estoque", () => {
    const p = new Produto("Calça", "Calça jeans", 129.9, 5)
    expect(() => p.aumentarEstoque(-1))
      .toThrow("Quantidade inválida para aumentar estoque");
  });


  // Diminuição de estoque válido
  it("deve diminuir o estoque corretamente", () => {
    const p = new Produto("Calça", "Calça jeans", 129.9, 5);

    p.diminuirEstoque(3);

    expect(p.estoque).toBe(2);
  });

  // Diminuição de estoque é inválido: o valor não é um número inteiro
  it("deve lançar erro se não for um número inteiro para aumentar o estoque", () => {
    const p = new Produto("Calça", "Calça jeans", 129.9, 5)
    expect(() => p.diminuirEstoque(true))
      .toThrow("Quantidade inválida para diminuir estoque");
  });

  // Diminuição de estoque é inválido: o valor é negativo
  it("deve lançar erro se for um número negativo para aumentar o estoque", () => {
    const p = new Produto("Calça", "Calça jeans", 129.9, 5)
    expect(() => p.diminuirEstoque(-1))
      .toThrow("Quantidade inválida para diminuir estoque");
  });

  // Diminuição de estoque é inválido: estoque insuficiente
  it("deve lançar erro se o valor para diminuição for maior do que o estoque", () => {
    const p = new Produto("Calça", "Calça jeans", 129.9, 5)
    expect(() => p.diminuirEstoque(6))
      .toThrow("Estoque insuficiente");
  });
});