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

describe('Bonus e2e test', () => {
  const bonusPageUrl = '/bonus';
  const bonusPageUrlPattern = new RegExp('/bonus(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'user';
  const password = Cypress.env('E2E_PASSWORD') ?? 'user';
  const bonusSample = { nom: 'AI', montant: 99234 };

  let bonus;

  beforeEach(() => {
    cy.login(username, password);
  });

  beforeEach(() => {
    cy.intercept('GET', '/api/bonuses+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/api/bonuses').as('postEntityRequest');
    cy.intercept('DELETE', '/api/bonuses/*').as('deleteEntityRequest');
  });

  afterEach(() => {
    if (bonus) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/bonuses/${bonus.id}`,
      }).then(() => {
        bonus = undefined;
      });
    }
  });

  it('Bonuses menu should load Bonuses page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('bonus');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('Bonus').should('exist');
    cy.url().should('match', bonusPageUrlPattern);
  });

  describe('Bonus page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(bonusPageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create Bonus page', () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should('match', new RegExp('/bonus/new$'));
        cy.getEntityCreateUpdateHeading('Bonus');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', bonusPageUrlPattern);
      });
    });

    describe('with existing value', () => {
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/api/bonuses',
          body: bonusSample,
        }).then(({ body }) => {
          bonus = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/api/bonuses+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              body: [bonus],
            }
          ).as('entitiesRequestInternal');
        });

        cy.visit(bonusPageUrl);

        cy.wait('@entitiesRequestInternal');
      });

      it('detail button click should load details Bonus page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('bonus');
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', bonusPageUrlPattern);
      });

      it('edit button click should load edit Bonus page and go back', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('Bonus');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', bonusPageUrlPattern);
      });

      it('edit button click should load edit Bonus page and save', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('Bonus');
        cy.get(entityCreateSaveButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', bonusPageUrlPattern);
      });

      it('last delete button click should delete instance of Bonus', () => {
        cy.intercept('GET', '/api/bonuses/*').as('dialogDeleteRequest');
        cy.get(entityDeleteButtonSelector).last().click();
        cy.wait('@dialogDeleteRequest');
        cy.getEntityDeleteDialogHeading('bonus').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', bonusPageUrlPattern);

        bonus = undefined;
      });
    });
  });

  describe('new Bonus page', () => {
    beforeEach(() => {
      cy.visit(`${bonusPageUrl}`);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading('Bonus');
    });

    it('should create an instance of Bonus', () => {
      cy.get(`[data-cy="nom"]`).type('a').should('have.value', 'a');

      cy.get(`[data-cy="montant"]`).type('66895').should('have.value', '66895');

      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(201);
        bonus = response.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(200);
      });
      cy.url().should('match', bonusPageUrlPattern);
    });
  });
});
