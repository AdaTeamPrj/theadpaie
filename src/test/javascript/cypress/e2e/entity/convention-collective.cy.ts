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

describe('ConventionCollective e2e test', () => {
  const conventionCollectivePageUrl = '/convention-collective';
  const conventionCollectivePageUrlPattern = new RegExp('/convention-collective(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'user';
  const password = Cypress.env('E2E_PASSWORD') ?? 'user';
  const conventionCollectiveSample = {
    idcc: 84202,
    nom: 'Awesome Team-oriented compress',
    position: 81049,
    coefficient: 55984,
    valeurPoint: 55865,
    baseFixe: 44899,
    salaireMinimaux: 20332,
  };

  let conventionCollective;

  beforeEach(() => {
    cy.login(username, password);
  });

  beforeEach(() => {
    cy.intercept('GET', '/api/convention-collectives+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/api/convention-collectives').as('postEntityRequest');
    cy.intercept('DELETE', '/api/convention-collectives/*').as('deleteEntityRequest');
  });

  afterEach(() => {
    if (conventionCollective) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/convention-collectives/${conventionCollective.id}`,
      }).then(() => {
        conventionCollective = undefined;
      });
    }
  });

  it('ConventionCollectives menu should load ConventionCollectives page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('convention-collective');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('ConventionCollective').should('exist');
    cy.url().should('match', conventionCollectivePageUrlPattern);
  });

  describe('ConventionCollective page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(conventionCollectivePageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create ConventionCollective page', () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should('match', new RegExp('/convention-collective/new$'));
        cy.getEntityCreateUpdateHeading('ConventionCollective');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', conventionCollectivePageUrlPattern);
      });
    });

    describe('with existing value', () => {
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/api/convention-collectives',
          body: conventionCollectiveSample,
        }).then(({ body }) => {
          conventionCollective = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/api/convention-collectives+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              body: [conventionCollective],
            }
          ).as('entitiesRequestInternal');
        });

        cy.visit(conventionCollectivePageUrl);

        cy.wait('@entitiesRequestInternal');
      });

      it('detail button click should load details ConventionCollective page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('conventionCollective');
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', conventionCollectivePageUrlPattern);
      });

      it('edit button click should load edit ConventionCollective page and go back', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('ConventionCollective');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', conventionCollectivePageUrlPattern);
      });

      it('edit button click should load edit ConventionCollective page and save', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('ConventionCollective');
        cy.get(entityCreateSaveButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', conventionCollectivePageUrlPattern);
      });

      it('last delete button click should delete instance of ConventionCollective', () => {
        cy.intercept('GET', '/api/convention-collectives/*').as('dialogDeleteRequest');
        cy.get(entityDeleteButtonSelector).last().click();
        cy.wait('@dialogDeleteRequest');
        cy.getEntityDeleteDialogHeading('conventionCollective').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', conventionCollectivePageUrlPattern);

        conventionCollective = undefined;
      });
    });
  });

  describe('new ConventionCollective page', () => {
    beforeEach(() => {
      cy.visit(`${conventionCollectivePageUrl}`);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading('ConventionCollective');
    });

    it('should create an instance of ConventionCollective', () => {
      cy.get(`[data-cy="idcc"]`).type('89165').should('have.value', '89165');

      cy.get(`[data-cy="nom"]`).type('Djibouti').should('have.value', 'Djibouti');

      cy.get(`[data-cy="position"]`).type('88832').should('have.value', '88832');

      cy.get(`[data-cy="coefficient"]`).type('17345').should('have.value', '17345');

      cy.get(`[data-cy="valeurPoint"]`).type('33883').should('have.value', '33883');

      cy.get(`[data-cy="baseFixe"]`).type('32212').should('have.value', '32212');

      cy.get(`[data-cy="salaireMinimaux"]`).type('27424').should('have.value', '27424');

      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(201);
        conventionCollective = response.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(200);
      });
      cy.url().should('match', conventionCollectivePageUrlPattern);
    });
  });
});
