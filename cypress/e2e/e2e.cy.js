/// <reference types="cypress" />

context('Exercicio - Testes End-to-end - Fluxo de pedido', () => {
    /*  Como cliente 
        Quero acessar a Loja EBAC 
        Para fazer um pedido de 4 produtos 
        Fazendo a escolha dos produtos
        Adicionando ao carrinho
        Preenchendo todas opções no checkout
        E validando minha compra ao final */

    beforeEach(() => {
        cy.visit('produtos')
        cy.url().should('include', '/produtos/');
        
    });

    it('Deve fazer um pedido na loja Ebac Shop de ponta a ponta', () => {
        // Dado que o usuário adiciona produtos ao carrinho
        cy.adicionarProdutosAoCarrinho();

        // Quando o usuário preenche os detalhes do checkout
        cy.preencherDetalhesCheckout();

        // E confirmar os dados do pedido
        cy.get('#terms').click();
        cy.get('#place_order').click();
        
        // Então o pedido deve ser completado com sucesso
        cy.contains('Obrigado. Seu pedido foi recebido.').should('be.visible');
    });
});