import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './convention-collective.reducer';

export const ConventionCollectiveDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const conventionCollectiveEntity = useAppSelector(state => state.conventionCollective.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="conventionCollectiveDetailsHeading">
          <Translate contentKey="theadpaieApp.conventionCollective.detail.title">ConventionCollective</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{conventionCollectiveEntity.id}</dd>
          <dt>
            <span id="idcc">
              <Translate contentKey="theadpaieApp.conventionCollective.idcc">Idcc</Translate>
            </span>
          </dt>
          <dd>{conventionCollectiveEntity.idcc}</dd>
          <dt>
            <span id="nom">
              <Translate contentKey="theadpaieApp.conventionCollective.nom">Nom</Translate>
            </span>
          </dt>
          <dd>{conventionCollectiveEntity.nom}</dd>
          <dt>
            <span id="position">
              <Translate contentKey="theadpaieApp.conventionCollective.position">Position</Translate>
            </span>
          </dt>
          <dd>{conventionCollectiveEntity.position}</dd>
          <dt>
            <span id="coefficient">
              <Translate contentKey="theadpaieApp.conventionCollective.coefficient">Coefficient</Translate>
            </span>
          </dt>
          <dd>{conventionCollectiveEntity.coefficient}</dd>
          <dt>
            <span id="valeurPoint">
              <Translate contentKey="theadpaieApp.conventionCollective.valeurPoint">Valeur Point</Translate>
            </span>
          </dt>
          <dd>{conventionCollectiveEntity.valeurPoint}</dd>
          <dt>
            <span id="baseFixe">
              <Translate contentKey="theadpaieApp.conventionCollective.baseFixe">Base Fixe</Translate>
            </span>
          </dt>
          <dd>{conventionCollectiveEntity.baseFixe}</dd>
          <dt>
            <span id="salaireMinimaux">
              <Translate contentKey="theadpaieApp.conventionCollective.salaireMinimaux">Salaire Minimaux</Translate>
            </span>
          </dt>
          <dd>{conventionCollectiveEntity.salaireMinimaux}</dd>
        </dl>
        <Button tag={Link} to="/convention-collective" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/convention-collective/${conventionCollectiveEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default ConventionCollectiveDetail;
