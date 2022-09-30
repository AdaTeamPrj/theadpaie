import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './cotisation.reducer';

export const CotisationDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const cotisationEntity = useAppSelector(state => state.cotisation.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="cotisationDetailsHeading">
          <Translate contentKey="theadpaieApp.cotisation.detail.title">Cotisation</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{cotisationEntity.id}</dd>
          <dt>
            <span id="name">
              <Translate contentKey="theadpaieApp.cotisation.name">Name</Translate>
            </span>
          </dt>
          <dd>{cotisationEntity.name}</dd>
          <dt>
            <span id="famille">
              <Translate contentKey="theadpaieApp.cotisation.famille">Famille</Translate>
            </span>
          </dt>
          <dd>{cotisationEntity.famille}</dd>
          <dt>
            <span id="taux">
              <Translate contentKey="theadpaieApp.cotisation.taux">Taux</Translate>
            </span>
          </dt>
          <dd>{cotisationEntity.taux}</dd>
          <dt>
            <span id="startDate">
              <Translate contentKey="theadpaieApp.cotisation.startDate">Start Date</Translate>
            </span>
          </dt>
          <dd>
            {cotisationEntity.startDate ? (
              <TextFormat value={cotisationEntity.startDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="endDate">
              <Translate contentKey="theadpaieApp.cotisation.endDate">End Date</Translate>
            </span>
          </dt>
          <dd>
            {cotisationEntity.endDate ? <TextFormat value={cotisationEntity.endDate} type="date" format={APP_LOCAL_DATE_FORMAT} /> : null}
          </dd>
          <dt>
            <span id="actuel">
              <Translate contentKey="theadpaieApp.cotisation.actuel">Actuel</Translate>
            </span>
          </dt>
          <dd>{cotisationEntity.actuel ? 'true' : 'false'}</dd>
        </dl>
        <Button tag={Link} to="/cotisation" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/cotisation/${cotisationEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default CotisationDetail;
