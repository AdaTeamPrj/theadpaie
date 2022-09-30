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

describe('TauxDImposition e2e test', () => {
  const tauxDImpositionPageUrl = '/taux-d-imposition';
  const tauxDImpositionPageUrlPattern = new RegExp('/taux-d-imposition(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'user';
  const password = Cypress.env('E2E_PASSWORD') ?? 'user';
  const tauxDImpositionSample = { taux: 62980, minSalary: 40748, startDate: '2022-09-30' };

  let tauxDImposition;

  beforeEach(() => {
    cy.login(username, password);
  });

  beforeEach(() => {
    cy.intercept('GET', '/api/taux-d-impositions+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/api/taux-d-impositions').as('postEntityRequest');
    cy.intercept('DELETE', '/api/taux-d-impositions/*').as('deleteEntityRequest');
  });

  afterEach(() => {
    if (tauxDImposition) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/taux-d-impositions/${tauxDImposition.id}`,
      }).then(() => {
        tauxDImposition = undefined;
      });
    }
  });

  it('TauxDImpositions menu should load TauxDImpositions page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('taux-d-imposition');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('TauxDImposition').should('exist');
    cy.url().should('match', tauxDImpositionPageUrlPattern);
  });

  describe('TauxDImposition page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(tauxDImpositionPageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create TauxDImposition page', () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should('match', new RegExp('/taux-d-imposition/new$'));
        cy.getEntityCreateUpdateHeading('TauxDImposition');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', tauxDImpositionPageUrlPattern);
      });
    });

    describe('with existing value', () => {
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/api/taux-d-impositions',
          body: tauxDImpositionSample,
        }).then(({ body }) => {
          tauxDImposition = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/api/taux-d-impositions+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              body: [tauxDImposition],
            }
          ).as('entitiesRequestInternal');
        });

        cy.visit(tauxDImpositionPageUrl);

        cy.wait('@entitiesRequestInternal');
      });

      it('detail button click should load details TauxDImposition page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('tauxDImposition');
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', tauxDImpositionPageUrlPattern);
      });

      it('edit button click should load edit TauxDImposition page and go back', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('TauxDImposition');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', tauxDImpositionPageUrlPattern);
      });

      it('edit button click should load edit TauxDImposition page and save', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('TauxDImposition');
        cy.get(entityCreateSaveButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', tauxDImpositionPageUrlPattern);
      });

      it('last delete button click should delete instance of TauxDImposition', () => {
        cy.intercept('GET', '/api/taux-d-impositions/*').as('dialogDeleteRequest');
        cy.get(entityDeleteButtonSelector).last().click();
        cy.wait('@dialogDeleteRequest');
        cy.getEntityDeleteDialogHeading('tauxDImposition').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', tauxDImpositionPageUrlPattern);

        tauxDImposition = undefined;
      });
    });
  });

  describe('new TauxDImposition page', () => {
    beforeEach(() => {
      cy.visit(`${tauxDImpositionPageUrl}`);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading('TauxDImposition');
    });

    it('should create an instance of TauxDImposition', () => {
      cy.get(`[data-cy="taux"]`).type('86648').should('have.value', '86648');

      cy.get(`[data-cy="minSalary"]`).type('72755').should('have.value', '72755');

      cy.get(`[data-cy="maxSalary"]`).type('30732').should('have.value', '30732');

      cy.get(`[data-cy="startDate"]`).type('2022-09-29').blur().should('have.value', '2022-09-29');

      cy.get(`[data-cy="endDate"]`).type('2022-09-30').blur().should('have.value', '2022-09-30');

      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(201);
        tauxDImposition = response.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(200);
      });
      cy.url().should('match', tauxDImpositionPageUrlPattern);
    });
  });
});
