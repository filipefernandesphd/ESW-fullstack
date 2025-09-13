const Produto = require("../src/produto/Produto");

describe("Produto", () => {
  it("deve deve ser criado com os atributos corretos", () => {
    const p = new Produto("Camisa", "Camisa azul", 79.9, 10);

    expect(p.nome).toBe("Camisa");
    expect(p.descricao).toBe("Camisa azul");
    expect(p.preco).toBe(79.9);
    expect(p.estoque).toBe(10);
  });

  it("deve aumentar o estoque corretamente", () => {
    const p = new Produto("Calça", "Calça jeans", 129.9, 5);

    p.aumentarEstoque(3);

    expect(p.estoque).toBe(8);
  });

  it("deve diminuir o estoque corretamente", () => {
    const p = new Produto("Tênis", "Tênis esportivo", 249.9, 7);

    p.diminuirEstoque(2);

    expect(p.estoque).toBe(5);
  });
});