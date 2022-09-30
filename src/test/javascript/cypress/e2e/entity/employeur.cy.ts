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

describe('Employeur e2e test', () => {
  const employeurPageUrl = '/employeur';
  const employeurPageUrlPattern = new RegExp('/employeur(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'user';
  const password = Cypress.env('E2E_PASSWORD') ?? 'user';
  const employeurSample = {
    name: 'Danemark Poitou-Charentes Italie',
    numeroSiret: 'calculate Cors',
    numApe: 'Midi-',
    numUrssaf: 'Cambridgeshire',
  };

  let employeur;

  beforeEach(() => {
    cy.login(username, password);
  });

  beforeEach(() => {
    cy.intercept('GET', '/api/employeurs+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/api/employeurs').as('postEntityRequest');
    cy.intercept('DELETE', '/api/employeurs/*').as('deleteEntityRequest');
  });

  afterEach(() => {
    if (employeur) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/employeurs/${employeur.id}`,
      }).then(() => {
        employeur = undefined;
      });
    }
  });

  it('Employeurs menu should load Employeurs page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('employeur');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('Employeur').should('exist');
    cy.url().should('match', employeurPageUrlPattern);
  });

  describe('Employeur page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(employeurPageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create Employeur page', () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should('match', new RegExp('/employeur/new$'));
        cy.getEntityCreateUpdateHeading('Employeur');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', employeurPageUrlPattern);
      });
    });

    describe('with existing value', () => {
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/api/employeurs',
          body: employeurSample,
        }).then(({ body }) => {
          employeur = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/api/employeurs+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              body: [employeur],
            }
          ).as('entitiesRequestInternal');
        });

        cy.visit(employeurPageUrl);

        cy.wait('@entitiesRequestInternal');
      });

      it('detail button click should load details Employeur page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('employeur');
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', employeurPageUrlPattern);
      });

      it('edit button click should load edit Employeur page and go back', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('Employeur');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', employeurPageUrlPattern);
      });

      it('edit button click should load edit Employeur page and save', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('Employeur');
        cy.get(entityCreateSaveButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', employeurPageUrlPattern);
      });

      it('last delete button click should delete instance of Employeur', () => {
        cy.intercept('GET', '/api/employeurs/*').as('dialogDeleteRequest');
        cy.get(entityDeleteButtonSelector).last().click();
        cy.wait('@dialogDeleteRequest');
        cy.getEntityDeleteDialogHeading('employeur').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', employeurPageUrlPattern);

        employeur = undefined;
      });
    });
  });

  describe('new Employeur page', () => {
    beforeEach(() => {
      cy.visit(`${employeurPageUrl}`);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading('Employeur');
    });

    it('should create an instance of Employeur', () => {
      cy.get(`[data-cy="name"]`).type('la bluetooth').should('have.value', 'la bluetooth');

      cy.get(`[data-cy="numeroSiret"]`).type('bXXXXXXXXXXXXX').should('have.value', 'bXXXXXXXXXXXXX');

      cy.get(`[data-cy="numApe"]`).type('Archi').should('have.value', 'Archi');

      cy.get(`[data-cy="numUrssaf"]`).type('overriding Acc').should('have.value', 'overriding Acc');

      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(201);
        employeur = response.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(200);
      });
      cy.url().should('match', employeurPageUrlPattern);
    });
  });
});
