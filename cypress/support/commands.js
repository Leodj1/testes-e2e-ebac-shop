// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
const faker = require('faker-br');

Cypress.Commands.add('login', (usuario, senha) => {
    cy.get('#username').type(usuario)
    cy.get('#password').type(senha, { log: false })
    cy.get('.woocommerce-form > .button').click()
});

// Comandos Personalizados
Cypress.Commands.add('adicionarProdutosAoCarrinho', () => {
    // Seleção do produto e adição ao carrinho
    const adicionarProdutoAoCarrinho = (produtoSelector, tamanho, cor) => {
        cy.get(produtoSelector).click();
        cy.get(`.button-variable-item-${tamanho}`).click();
        cy.get(`.button-variable-item-${cor}`).click();
        cy.get('.single_add_to_cart_button').click();
        cy.get('.tbay-woocommerce-breadcrumb > :nth-child(5) > a').click();
    };

    adicionarProdutoAoCarrinho('.post-2559 > .product-block > .block-inner > .image > .product-image > .image-hover', 'S', 'Blue');
    adicionarProdutoAoCarrinho('.post-2606 > .product-block > .block-inner > .image > .product-image > .image-hover', 'S', 'Orange');
    adicionarProdutoAoCarrinho('.post-2517 > .product-block > .block-inner > .image > .product-image > .image-hover', 'S', 'Black');
    adicionarProdutoAoCarrinho('.post-2478 > .product-block > .block-inner > .image > .product-image > .image-hover', 'S', 'Green');

    // Quando o usuário acessa o carrinho e procede para o checkout
    cy.get('.dropdown-toggle > .text-skin > .icon-basket').click();
    cy.get('#cart .checkout').click();
    cy.contains('Detalhes de faturamento').should('be.visible');
});

Cypress.Commands.add('preencherDetalhesCheckout', () => {
    const dadosUsuario = {
        nome: faker.name.firstName(),
        sobrenome: faker.name.lastName(),
        empresa: faker.company.companyName(),
        endereco1: faker.address.streetName(),
        endereco2: faker.address.secondaryAddress(),
        cidade: faker.address.city(),
        telefone: faker.phone.phoneNumberFormat(),
        email: faker.internet.email(),
        comentarios: faker.lorem.words(5),
    };

    cy.get('#billing_first_name').type(dadosUsuario.nome);
    cy.get('#billing_last_name').type(dadosUsuario.sobrenome);
    cy.get('#billing_company').type(dadosUsuario.empresa);
    cy.get('#billing_address_1').type(dadosUsuario.endereco1);
    cy.get('#billing_address_2').type(dadosUsuario.endereco2);
    cy.get('#billing_city').type(dadosUsuario.cidade);
    cy.get('#billing_postcode').type('08391-712');
    cy.get('#billing_phone').type(dadosUsuario.telefone);
    cy.get('#billing_email').type(dadosUsuario.email);
    cy.get('#order_comments').type(dadosUsuario.comentarios);

    // Validação dos detalhes de cobrança
    cy.get('#billing_first_name').should('have.value', dadosUsuario.nome);
    cy.get('#billing_last_name').should('have.value', dadosUsuario.sobrenome);
    cy.get('#billing_company').should('have.value', dadosUsuario.empresa);
    cy.get('#billing_address_1').should('have.value', dadosUsuario.endereco1);
    cy.get('#billing_address_2').should('have.value', dadosUsuario.endereco2);
    cy.get('#billing_city').should('have.value', dadosUsuario.cidade);
    cy.get('#billing_postcode').should('have.value', '08391-712');
    cy.get('#billing_phone').should('have.value', dadosUsuario.telefone);
    cy.get('#billing_email').should('have.value', dadosUsuario.email);
    cy.get('#order_comments').should('have.value', dadosUsuario.comentarios);

});



