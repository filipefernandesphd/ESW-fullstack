const Produto = require("../src/produto/Produto");
const Carrinho = require("../src/carrinho/Carrinho");
const axios = require("axios");

jest.mock("axios");

describe("Carrinho de Compras", () => {
    let carrinho, camisa, tenis;

    beforeEach(() => {
        carrinho = new Carrinho();
        camisa = new Produto("Camisa", "Camisa azul", 50, 10);
        tenis = new Produto("Tênis", "Tênis esportivo", 200, 5);
    });

    afterEach(() => {
        carrinho.limpar();
    });

    describe("Adição de itens válida", () => {
        it("deve adicionar um produto ao carrinho", () => {
            carrinho.adicionar(camisa, 2);
            expect(carrinho.itens.length).toBe(1);
            expect(carrinho.itens[0].qtd).toBe(2);
        });

        it("deve somar a quantidade se o mesmo produto for adicionado", () => {
            carrinho.adicionar(camisa, 1);
            carrinho.adicionar(camisa, 3);
            expect(carrinho.itens[0].qtd).toBe(4);
        });
    });

    describe("Adição de itens inválida", () => {
        it.each([
            [() => null, 1, "Item inválido"],
            [() => camisa, 0, "Quantidade inválida"],
            [() => camisa, -2, "Quantidade inválida"],
            [() => camisa, 1.5, "Quantidade inválida"],
        ])(
            "não deve adicionar produto (%s) inválido ou quantidade errada (%s)",
            (produto, qtd, mensagem) => {
                expect(() => carrinho.adicionar(produto(), qtd)).toThrow(mensagem);
            }
        );
    });

    describe("Remoção de itens válida", () => {
        it("deve remover um produto existente", () => {
            carrinho.adicionar(camisa, 1);
            carrinho.remover("Camisa");
            expect(carrinho.itens.length).toBe(0);
        });
    });

    describe("Remoção de itens inválida", () => {
        it("deve lançar erro ao remover produto inexistente", () => {
            expect(() => carrinho.remover("Inexistente"))
                .toThrow("Produto não encontrado no carrinho");
        });
    });

    describe("Total e limpeza", () => {
        it("deve calcular o valor total corretamente", () => {
            carrinho.adicionar(camisa, 2); // 2 * 50 = 100
            carrinho.adicionar(tenis, 1);  // 1 * 200 = 200
            expect(carrinho.total()).toBe(300);
        });

        it("deve limpar o carrinho", () => {
            carrinho.adicionar(camisa, 1);
            carrinho.adicionar(tenis, 1);
            carrinho.limpar();
            expect(carrinho.itens.length).toBe(0);
        });
    });

    describe("Cálculo de frete", () => {
        let carrinho, camisa;

        beforeEach(() => {
            carrinho = new Carrinho();
            camisa = new Produto("Camisa", "Camisa azul", 50, 10);
            carrinho.adicionar(camisa, 2); // subtotal = 100
        });

        afterEach(() => {
            carrinho.limpar();
            jest.clearAllMocks();
        });

        it.each([
            ["Norte", "69080900", 50],       // Manaus-AM
            ["Nordeste", "40010000", 40],    // Salvador-BA
            ["Centro-Oeste", "74690900", 30],// Goiânia-DF
            ["Sudeste", "28300000", 20],     // Itaperuna-RJ
            ["Sul", "90010000", 25]          // Porto Alegre-RS
        ])(
            "deve calcular frete para região %s",
            async (regiao, cep, esperado) => {
                axios.get.mockResolvedValue({ data:{regiao} });

                const frete = await carrinho.calcularFrete(cep);

                expect(frete).toBe(esperado);
                expect(carrinho.total()).toBe(100 + esperado);
            }
        );

        it("deve gerar exceção ao informar o CEP errado", async () => {
            axios.get.mockResolvedValue({ data:{erro:true} });
            
            await expect(carrinho.calcularFrete("00000000"))
                .rejects // aguarda a Promise ser rejeitada
                .toThrow("CEP inválido"); // valida a mensagem do erro
        });
    });
});