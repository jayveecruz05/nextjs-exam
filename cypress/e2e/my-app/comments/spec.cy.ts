describe('Comments Page', () => {
  it('Test Comments Page', () => {
    cy.request('GET', 'https://jsonplaceholder.typicode.com/comments').then(response => {
      expect(response.status).to.eq(200) // check if API request was successful
      expect(response.body).to.have.length.above(0) // check if response contains data

      cy.visit('http://localhost:3000')
      cy.get('.ag-center-cols-container').should('exist') // check if data parent element exist in the DOM

      response.body.every((_: any, index: number) => {
        cy.get('.ag-center-cols-container').find(`[row-id="${index}"]`).should('exist') // check if data exist in the DOM
        return (index < 4) ? true : false
      })
    })

    cy.get('.title').should('contain', 'Comments')
    cy.get('.search-header').should('exist')
    cy.get('input.filter-text-box').type('quo')
    cy.get('.ag-theme-quartz').should('exist')
    cy.get('a[href="/en/comment/5"]').should('contain', 'View').should('exist').click()
  })

  it('Test Comment Page', () => {
    cy.request('GET', 'https://jsonplaceholder.typicode.com/comments/5').then(response => {
      expect(response.status).to.eq(200) // check if API request was successful

      cy.visit('http://localhost:3000/comment/5')
      cy.get('[aria-label="properties-holder"]').should('exist') // check if data parent element exist in the DOM

      for (const property in response.body) {
        cy.get(`[aria-label="${property}"]`).should('exist').should('have.text', response.body[property]) // check if data exist in the DOM
      }

      cy.get('[aria-label="back-button"]').should('exist').click()
    })
  })

  it('Test Language Change', () => {
    cy.visit('http://localhost:3000/')

    cy.get('.translation').should('exist')
    cy.get('[aria-label="english-lang"]').should('exist')
    cy.get('[aria-label="chinese-lang"]').should('exist')

    cy.get('[aria-label="chinese-lang"]').click()
    cy.get('[aria-label="chinese-lang"]').should('have.class', 'active')
    cy.get('[aria-label="english-lang"]').should('not.have.class', 'active')
    cy.get('.title').should('exist').should('contain', '评论')

    cy.get('[aria-label="english-lang"]').click()
    cy.get('[aria-label="english-lang"]').should('have.class', 'active')
    cy.get('[aria-label="chinese-lang"]').should('not.have.class', 'active')
    cy.get('.title').should('exist').should('contain', 'Comments')
  })
})