describe('MovieRama page start', function () {

    it('Movies must be load movies when it renders', function () {

        cy.visit('/');
        cy.get('[id=resultsWrapper] > .container').should(($movies) => {
            expect($movies).to.have.length(20);
        });

    });

    it('Movies must be load movies  when scrolls to last element', function () {

        cy.visit('/');
        cy.get('[id=resultsWrapper] > .container').should(($movies) => {
            expect($movies).to.have.length(20);
        });
        cy.scrollTo('bottom')
        cy.get('[id=resultsWrapper] > .container').should(($movies) => {
            expect($movies).to.have.length(40);
        });

    });
    it('Must scroll to top of the page if the button clicked', function () {

        cy.visit('/');
        cy.get('[id=resultsWrapper] > .container').should(($movies) => {
            expect($movies).to.have.length(20);
        });
        cy.scrollTo('bottom')
        cy.get('[id=resultsWrapper] > .container').should(($movies) => {
            expect($movies).to.have.length(40);
        });
        cy.get('[id=scrollToTopButton]').click()
        expect(window.screenY).to.equal(0)


    });

});
describe('User start searching', function () {

    it('Movies must be loaded when user search', function () {

        cy.visit('/');
        cy.get('[id=moviesearch]').type('a')
        cy.get('[id=resultsWrapper] > .container').should(($movies) => {
            expect($movies).to.have.length(20);
            expect(window.screenY).to.equal(0)
        });

    });
    it('Movies must be loaded when user search and scroll to bottom', function () {

        cy.visit('/');
        cy.get('[id=moviesearch]').type('a')
        cy.get('[id=resultsWrapper] > .container').should(($movies) => {
            expect($movies).to.have.length(20);
            expect(window.screenY).to.equal(0)
        });
        cy.scrollTo('bottom')
        cy.get('[id=resultsWrapper] > .container').should(($movies) => {
            expect($movies).to.have.length(40);
        });

    });

    it('Must scroll to top of the page if the button clicked', function () {

        cy.visit('/');
        cy.get('[id=moviesearch]').type('a')
        cy.get('[id=resultsWrapper] > .container').should(($movies) => {
            expect($movies).to.have.length(20);
            expect(window.screenY).to.equal(0)
        });
        cy.scrollTo('bottom')
        cy.get('[id=resultsWrapper] > .container').should(($movies) => {
            expect($movies).to.have.length(40);
        });
        cy.get('[id=scrollToTopButton]').click()
        expect(window.screenY).to.equal(0)


    });
});