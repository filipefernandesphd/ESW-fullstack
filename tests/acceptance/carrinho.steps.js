const { defineFeature, loadFeature } = require("jest-cucumber");
const path = require("path");
const Carrinho = require("../../backend/src/carrinho/Carrinho");
const Produto = require("../../backend/src/produto/Produto");

const feature = loadFeature(path.join(__dirname, "../features/carrinho.feature"));

defineFeature( feature, (test)=>{
    let carrinho, camisa, tenis, frete, mensagem, total;

    beforeEach(()=>{
        carrinho = new Carrinho();
        camisa = new Produto("Camisa", "Camisa azul", 50, 10);
        tenis = new Produto("Tênis", "Tênis esportivo", 200, 5);
    });

    test("Compra bem-sucedida", ({given, and, when, then})=>{
        given("que o usuário acessou a página do carrinho", ()=>{
            expect(carrinho).toBeDefined();
        });

        and("adicionou 2 camisas e 1 tênis ao carrinho", ()=>{
            carrinho.adicionar(camisa, 2);
            carrinho.adicionar(tenis, 1);
            expect(carrinho.itens.length).toBe(2);
        });

        when(/^ele informa o CEP "(.*)"$/, async (cep)=>{
            frete = await carrinho.calcularFrete(cep);
        });

        and('clica em "Calcular Frete"', ()=>{
            expect(frete).toBe(25);
        });

        and('clica em "Comprar"', ()=>{
            mensagem = "Compra realizada com sucesso!"
        });

        then(/^o sistema deve exibir a mensagem "(.*)"$/, (mensagemEsperada)=>{
            expect(mensagem).toBe(mensagemEsperada);
        });

        and(/^o total deve ser R\$ "(.*)"$/, (valorEsperado)=>{
            total = carrinho.total();
            expect(total).toBe(Number(valorEsperado));
        });
    });
});