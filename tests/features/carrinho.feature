# language: pt
Funcionalidade: Realizar Compras
    Como usuário do sistema
    Eu gostaria de realizar compras de produtos
    Para que que possa conlcuir a compra

    Cenário: Compra bem-sucedida
        Dado que o usuário acesso a página do carrinho
        E adicionou 2 camisas e 1 tênis ao carrinho
        Quando ele informa o CEP "90010000"
        E clica em "Calcular Frete"
        E clica em "Compra"
        Então o sistema deve exibir a mensagem "Compra realizada com sucesso!"
        E o total deve ser R$ "325.00"