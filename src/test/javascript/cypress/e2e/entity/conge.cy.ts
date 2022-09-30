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

describe('Conge e2e test', () => {
  const congePageUrl = '/conge';
  const congePageUrlPattern = new RegExp('/conge(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'user';
  const password = Cypress.env('E2E_PASSWORD') ?? 'user';
  const congeSample = {
    holdateStart: '2022-09-30',
    holdateEnd: '2022-09-30',
    holdatePay: 81614,
    nbCongePris: 13313,
    dateDemande: '2022-09-30',
    decision: 'Enattente',
  };

  let conge;

  beforeEach(() => {
    cy.login(username, password);
  });

  beforeEach(() => {
    cy.intercept('GET', '/api/conges+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/api/conges').as('postEntityRequest');
    cy.intercept('DELETE', '/api/conges/*').as('deleteEntityRequest');
  });

  afterEach(() => {
    if (conge) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/conges/${conge.id}`,
      }).then(() => {
        conge = undefined;
      });
    }
  });

  it('Conges menu should load Conges page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('conge');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('Conge').should('exist');
    cy.url().should('match', congePageUrlPattern);
  });

  describe('Conge page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(congePageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create Conge page', () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should('match', new RegExp('/conge/new$'));
        cy.getEntityCreateUpdateHeading('Conge');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', congePageUrlPattern);
      });
    });

    describe('with existing value', () => {
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/api/conges',
          body: congeSample,
        }).then(({ body }) => {
          conge = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/api/conges+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              body: [conge],
            }
          ).as('entitiesRequestInternal');
        });

        cy.visit(congePageUrl);

        cy.wait('@entitiesRequestInternal');
      });

      it('detail button click should load details Conge page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('conge');
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', congePageUrlPattern);
      });

      it('edit button click should load edit Conge page and go back', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('Conge');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', congePageUrlPattern);
      });

      it('edit button click should load edit Conge page and save', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('Conge');
        cy.get(entityCreateSaveButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', congePageUrlPattern);
      });

      it('last delete button click should delete instance of Conge', () => {
        cy.intercept('GET', '/api/conges/*').as('dialogDeleteRequest');
        cy.get(entityDeleteButtonSelector).last().click();
        cy.wait('@dialogDeleteRequest');
        cy.getEntityDeleteDialogHeading('conge').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', congePageUrlPattern);

        conge = undefined;
      });
    });
  });

  describe('new Conge page', () => {
    beforeEach(() => {
      cy.visit(`${congePageUrl}`);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading('Conge');
    });

    it('should create an instance of Conge', () => {
      cy.get(`[data-cy="holdateStart"]`).type('2022-09-30').blur().should('have.value', '2022-09-30');

      cy.get(`[data-cy="holdateEnd"]`).type('2022-09-30').blur().should('have.value', '2022-09-30');

      cy.get(`[data-cy="holdatePay"]`).type('30777').should('have.value', '30777');

      cy.get(`[data-cy="nbCongeAcquis"]`).type('17208').should('have.value', '17208');

      cy.get(`[data-cy="nbCongePris"]`).type('14973').should('have.value', '14973');

      cy.get(`[data-cy="dateDemande"]`).type('2022-09-30').blur().should('have.value', '2022-09-30');

      cy.get(`[data-cy="decision"]`).select('Refuse');

      cy.get(`[data-cy="dateReponse"]`).type('2022-09-30').blur().should('have.value', '2022-09-30');

      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(201);
        conge = response.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(200);
      });
      cy.url().should('match', congePageUrlPattern);
    });
  });
});
