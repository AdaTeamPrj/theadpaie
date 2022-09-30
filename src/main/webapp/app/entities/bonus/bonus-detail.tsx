import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './bonus.reducer';

export const BonusDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const bonusEntity = useAppSelector(state => state.bonus.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="bonusDetailsHeading">
          <Translate contentKey="theadpaieApp.bonus.detail.title">Bonus</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{bonusEntity.id}</dd>
          <dt>
            <span id="nom">
              <Translate contentKey="theadpaieApp.bonus.nom">Nom</Translate>
            </span>
          </dt>
          <dd>{bonusEntity.nom}</dd>
          <dt>
            <span id="montant">
              <Translate contentKey="theadpaieApp.bonus.montant">Montant</Translate>
            </span>
          </dt>
          <dd>{bonusEntity.montant}</dd>
          <dt>
            <Translate contentKey="theadpaieApp.bonus.contrat">Contrat</Translate>
          </dt>
          <dd>{bonusEntity.contrat ? bonusEntity.contrat.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/bonus" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/bonus/${bonusEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default BonusDetail;
