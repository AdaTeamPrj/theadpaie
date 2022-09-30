import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './taux-d-imposition.reducer';

export const TauxDImpositionDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const tauxDImpositionEntity = useAppSelector(state => state.tauxDImposition.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="tauxDImpositionDetailsHeading">
          <Translate contentKey="theadpaieApp.tauxDImposition.detail.title">TauxDImposition</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{tauxDImpositionEntity.id}</dd>
          <dt>
            <span id="taux">
              <Translate contentKey="theadpaieApp.tauxDImposition.taux">Taux</Translate>
            </span>
          </dt>
          <dd>{tauxDImpositionEntity.taux}</dd>
          <dt>
            <span id="minSalary">
              <Translate contentKey="theadpaieApp.tauxDImposition.minSalary">Min Salary</Translate>
            </span>
          </dt>
          <dd>{tauxDImpositionEntity.minSalary}</dd>
          <dt>
            <span id="maxSalary">
              <Translate contentKey="theadpaieApp.tauxDImposition.maxSalary">Max Salary</Translate>
            </span>
          </dt>
          <dd>{tauxDImpositionEntity.maxSalary}</dd>
          <dt>
            <span id="startDate">
              <Translate contentKey="theadpaieApp.tauxDImposition.startDate">Start Date</Translate>
            </span>
          </dt>
          <dd>
            {tauxDImpositionEntity.startDate ? (
              <TextFormat value={tauxDImpositionEntity.startDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="endDate">
              <Translate contentKey="theadpaieApp.tauxDImposition.endDate">End Date</Translate>
            </span>
          </dt>
          <dd>
            {tauxDImpositionEntity.endDate ? (
              <TextFormat value={tauxDImpositionEntity.endDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </dd>
        </dl>
        <Button tag={Link} to="/taux-d-imposition" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/taux-d-imposition/${tauxDImpositionEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default TauxDImpositionDetail;
