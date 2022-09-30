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

describe('FicheDePaie e2e test', () => {
  const ficheDePaiePageUrl = '/fiche-de-paie';
  const ficheDePaiePageUrlPattern = new RegExp('/fiche-de-paie(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'user';
  const password = Cypress.env('E2E_PASSWORD') ?? 'user';
  const ficheDePaieSample = {
    salaireBrut: 62851,
    startDate: '2022-09-29',
    endDate: '2022-09-30',
    datepaiement: '2022-09-29',
    salaireNet: 60376,
    montantNetAvantImpots: 80341,
    proFees: 61925,
  };

  let ficheDePaie;

  beforeEach(() => {
    cy.login(username, password);
  });

  beforeEach(() => {
    cy.intercept('GET', '/api/fiche-de-paies+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/api/fiche-de-paies').as('postEntityRequest');
    cy.intercept('DELETE', '/api/fiche-de-paies/*').as('deleteEntityRequest');
  });

  afterEach(() => {
    if (ficheDePaie) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/fiche-de-paies/${ficheDePaie.id}`,
      }).then(() => {
        ficheDePaie = undefined;
      });
    }
  });

  it('FicheDePaies menu should load FicheDePaies page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('fiche-de-paie');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('FicheDePaie').should('exist');
    cy.url().should('match', ficheDePaiePageUrlPattern);
  });

  describe('FicheDePaie page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(ficheDePaiePageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create FicheDePaie page', () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should('match', new RegExp('/fiche-de-paie/new$'));
        cy.getEntityCreateUpdateHeading('FicheDePaie');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', ficheDePaiePageUrlPattern);
      });
    });

    describe('with existing value', () => {
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/api/fiche-de-paies',
          body: ficheDePaieSample,
        }).then(({ body }) => {
          ficheDePaie = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/api/fiche-de-paies+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              body: [ficheDePaie],
            }
          ).as('entitiesRequestInternal');
        });

        cy.visit(ficheDePaiePageUrl);

        cy.wait('@entitiesRequestInternal');
      });

      it('detail button click should load details FicheDePaie page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('ficheDePaie');
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', ficheDePaiePageUrlPattern);
      });

      it('edit button click should load edit FicheDePaie page and go back', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('FicheDePaie');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', ficheDePaiePageUrlPattern);
      });

      it('edit button click should load edit FicheDePaie page and save', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('FicheDePaie');
        cy.get(entityCreateSaveButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', ficheDePaiePageUrlPattern);
      });

      it('last delete button click should delete instance of FicheDePaie', () => {
        cy.intercept('GET', '/api/fiche-de-paies/*').as('dialogDeleteRequest');
        cy.get(entityDeleteButtonSelector).last().click();
        cy.wait('@dialogDeleteRequest');
        cy.getEntityDeleteDialogHeading('ficheDePaie').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', ficheDePaiePageUrlPattern);

        ficheDePaie = undefined;
      });
    });
  });

  describe('new FicheDePaie page', () => {
    beforeEach(() => {
      cy.visit(`${ficheDePaiePageUrl}`);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading('FicheDePaie');
    });

    it('should create an instance of FicheDePaie', () => {
      cy.get(`[data-cy="salaireBrut"]`).type('17590').should('have.value', '17590');

      cy.get(`[data-cy="startDate"]`).type('2022-09-30').blur().should('have.value', '2022-09-30');

      cy.get(`[data-cy="endDate"]`).type('2022-09-30').blur().should('have.value', '2022-09-30');

      cy.get(`[data-cy="datepaiement"]`).type('2022-09-29').blur().should('have.value', '2022-09-29');

      cy.get(`[data-cy="salaireNet"]`).type('5361').should('have.value', '5361');

      cy.get(`[data-cy="montantNetAvantImpots"]`).type('86863').should('have.value', '86863');

      cy.get(`[data-cy="proFees"]`).type('38910').should('have.value', '38910');

      cy.get(`[data-cy="deductions"]`).type('60542').should('have.value', '60542');

      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(201);
        ficheDePaie = response.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(200);
      });
      cy.url().should('match', ficheDePaiePageUrlPattern);
    });
  });
});
