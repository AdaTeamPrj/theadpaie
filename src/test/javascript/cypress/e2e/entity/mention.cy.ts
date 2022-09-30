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

describe('Mention e2e test', () => {
  const mentionPageUrl = '/mention';
  const mentionPageUrlPattern = new RegExp('/mention(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'user';
  const password = Cypress.env('E2E_PASSWORD') ?? 'user';
  const mentionSample = { mention: 'Architecte connecting' };

  let mention;

  beforeEach(() => {
    cy.login(username, password);
  });

  beforeEach(() => {
    cy.intercept('GET', '/api/mentions+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/api/mentions').as('postEntityRequest');
    cy.intercept('DELETE', '/api/mentions/*').as('deleteEntityRequest');
  });

  afterEach(() => {
    if (mention) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/mentions/${mention.id}`,
      }).then(() => {
        mention = undefined;
      });
    }
  });

  it('Mentions menu should load Mentions page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('mention');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('Mention').should('exist');
    cy.url().should('match', mentionPageUrlPattern);
  });

  describe('Mention page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(mentionPageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create Mention page', () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should('match', new RegExp('/mention/new$'));
        cy.getEntityCreateUpdateHeading('Mention');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', mentionPageUrlPattern);
      });
    });

    describe('with existing value', () => {
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/api/mentions',
          body: mentionSample,
        }).then(({ body }) => {
          mention = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/api/mentions+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              body: [mention],
            }
          ).as('entitiesRequestInternal');
        });

        cy.visit(mentionPageUrl);

        cy.wait('@entitiesRequestInternal');
      });

      it('detail button click should load details Mention page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('mention');
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', mentionPageUrlPattern);
      });

      it('edit button click should load edit Mention page and go back', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('Mention');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', mentionPageUrlPattern);
      });

      it('edit button click should load edit Mention page and save', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('Mention');
        cy.get(entityCreateSaveButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', mentionPageUrlPattern);
      });

      it('last delete button click should delete instance of Mention', () => {
        cy.intercept('GET', '/api/mentions/*').as('dialogDeleteRequest');
        cy.get(entityDeleteButtonSelector).last().click();
        cy.wait('@dialogDeleteRequest');
        cy.getEntityDeleteDialogHeading('mention').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', mentionPageUrlPattern);

        mention = undefined;
      });
    });
  });

  describe('new Mention page', () => {
    beforeEach(() => {
      cy.visit(`${mentionPageUrl}`);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading('Mention');
    });

    it('should create an instance of Mention', () => {
      cy.get(`[data-cy="mention"]`).type('distributed').should('have.value', 'distributed');

      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(201);
        mention = response.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(200);
      });
      cy.url().should('match', mentionPageUrlPattern);
    });
  });
});
