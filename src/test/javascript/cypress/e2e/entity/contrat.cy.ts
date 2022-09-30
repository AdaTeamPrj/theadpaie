import {
  entityTableSelector,
  entityDetailsButtonSelector,
  entityDetailsBackButtonSelector,
  entityCreateButtonSelector,
  entityCreateSaveButtonSelector,
  entityCreateCancelButtonSelector,
  entityEditButtonSelector,
  entityDeleteButtonSelector,
  entityConfirmDeleteButtonSelector,
} from '../../support/entity';

describe('Contrat e2e test', () => {
  const contratPageUrl = '/contrat';
  const contratPageUrlPattern = new RegExp('/contrat(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'user';
  const password = Cypress.env('E2E_PASSWORD') ?? 'user';
  const contratSample = { salaireBase: 47121, emploi: 'Mouse de', dateArrive: '2022-09-30', classification: 54495, typeForfait: 'Jour' };

  let contrat;

  beforeEach(() => {
    cy.login(username, password);
  });

  beforeEach(() => {
    cy.intercept('GET', '/api/contrats+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/api/contrats').as('postEntityRequest');
    cy.intercept('DELETE', '/api/contrats/*').as('deleteEntityRequest');
  });

  afterEach(() => {
    if (contrat) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/contrats/${contrat.id}`,
      }).then(() => {
        contrat = undefined;
      });
    }
  });

  it('Contrats menu should load Contrats page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('contrat');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('Contrat').should('exist');
    cy.url().should('match', contratPageUrlPattern);
  });

  describe('Contrat page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(contratPageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create Contrat page', () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should('match', new RegExp('/contrat/new$'));
        cy.getEntityCreateUpdateHeading('Contrat');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', contratPageUrlPattern);
      });
    });

    describe('with existing value', () => {
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/api/contrats',
          body: contratSample,
        }).then(({ body }) => {
          contrat = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/api/contrats+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              body: [contrat],
            }
          ).as('entitiesRequestInternal');
        });

        cy.visit(contratPageUrl);

        cy.wait('@entitiesRequestInternal');
      });

      it('detail button click should load details Contrat page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('contrat');
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', contratPageUrlPattern);
      });

      it('edit button click should load edit Contrat page and go back', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('Contrat');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', contratPageUrlPattern);
      });

      it('edit button click should load edit Contrat page and save', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('Contrat');
        cy.get(entityCreateSaveButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', contratPageUrlPattern);
      });

      it('last delete button click should delete instance of Contrat', () => {
        cy.intercept('GET', '/api/contrats/*').as('dialogDeleteRequest');
        cy.get(entityDeleteButtonSelector).last().click();
        cy.wait('@dialogDeleteRequest');
        cy.getEntityDeleteDialogHeading('contrat').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', contratPageUrlPattern);

        contrat = undefined;
      });
    });
  });

  describe('new Contrat page', () => {
    beforeEach(() => {
      cy.visit(`${contratPageUrl}`);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading('Contrat');
    });

    it('should create an instance of Contrat', () => {
      cy.get(`[data-cy="salaireBase"]`).type('74859').should('have.value', '74859');

      cy.get(`[data-cy="emploi"]`).type('Berkshire').should('have.value', 'Berkshire');

      cy.get(`[data-cy="dateArrive"]`).type('2022-09-30').blur().should('have.value', '2022-09-30');

      cy.get(`[data-cy="classification"]`).type('37815').should('have.value', '37815');

      cy.get(`[data-cy="typeForfait"]`).select('Jour');

      cy.get(`[data-cy="nbHeure"]`).type('11430').should('have.value', '11430');

      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(201);
        contrat = response.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(200);
      });
      cy.url().should('match', contratPageUrlPattern);
    });
  });
});
