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

describe('Cotisation e2e test', () => {
  const cotisationPageUrl = '/cotisation';
  const cotisationPageUrlPattern = new RegExp('/cotisation(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'user';
  const password = Cypress.env('E2E_PASSWORD') ?? 'user';
  const cotisationSample = { name: 'Rubber', famille: 'Retraite', taux: 47737, startDate: '2022-09-30', actuel: true };

  let cotisation;

  beforeEach(() => {
    cy.login(username, password);
  });

  beforeEach(() => {
    cy.intercept('GET', '/api/cotisations+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/api/cotisations').as('postEntityRequest');
    cy.intercept('DELETE', '/api/cotisations/*').as('deleteEntityRequest');
  });

  afterEach(() => {
    if (cotisation) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/cotisations/${cotisation.id}`,
      }).then(() => {
        cotisation = undefined;
      });
    }
  });

  it('Cotisations menu should load Cotisations page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('cotisation');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('Cotisation').should('exist');
    cy.url().should('match', cotisationPageUrlPattern);
  });

  describe('Cotisation page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(cotisationPageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create Cotisation page', () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should('match', new RegExp('/cotisation/new$'));
        cy.getEntityCreateUpdateHeading('Cotisation');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', cotisationPageUrlPattern);
      });
    });

    describe('with existing value', () => {
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/api/cotisations',
          body: cotisationSample,
        }).then(({ body }) => {
          cotisation = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/api/cotisations+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              body: [cotisation],
            }
          ).as('entitiesRequestInternal');
        });

        cy.visit(cotisationPageUrl);

        cy.wait('@entitiesRequestInternal');
      });

      it('detail button click should load details Cotisation page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('cotisation');
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', cotisationPageUrlPattern);
      });

      it('edit button click should load edit Cotisation page and go back', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('Cotisation');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', cotisationPageUrlPattern);
      });

      it('edit button click should load edit Cotisation page and save', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('Cotisation');
        cy.get(entityCreateSaveButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', cotisationPageUrlPattern);
      });

      it('last delete button click should delete instance of Cotisation', () => {
        cy.intercept('GET', '/api/cotisations/*').as('dialogDeleteRequest');
        cy.get(entityDeleteButtonSelector).last().click();
        cy.wait('@dialogDeleteRequest');
        cy.getEntityDeleteDialogHeading('cotisation').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', cotisationPageUrlPattern);

        cotisation = undefined;
      });
    });
  });

  describe('new Cotisation page', () => {
    beforeEach(() => {
      cy.visit(`${cotisationPageUrl}`);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading('Cotisation');
    });

    it('should create an instance of Cotisation', () => {
      cy.get(`[data-cy="name"]`).type('e-business Small').should('have.value', 'e-business Small');

      cy.get(`[data-cy="famille"]`).select('Famille');

      cy.get(`[data-cy="taux"]`).type('75336').should('have.value', '75336');

      cy.get(`[data-cy="startDate"]`).type('2022-09-30').blur().should('have.value', '2022-09-30');

      cy.get(`[data-cy="endDate"]`).type('2022-09-30').blur().should('have.value', '2022-09-30');

      cy.get(`[data-cy="actuel"]`).should('not.be.checked');
      cy.get(`[data-cy="actuel"]`).click().should('be.checked');

      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(201);
        cotisation = response.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(200);
      });
      cy.url().should('match', cotisationPageUrlPattern);
    });
  });
});
