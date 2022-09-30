import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './employeur.reducer';

export const EmployeurDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const employeurEntity = useAppSelector(state => state.employeur.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="employeurDetailsHeading">
          <Translate contentKey="theadpaieApp.employeur.detail.title">Employeur</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{employeurEntity.id}</dd>
          <dt>
            <span id="name">
              <Translate contentKey="theadpaieApp.employeur.name">Name</Translate>
            </span>
          </dt>
          <dd>{employeurEntity.name}</dd>
          <dt>
            <span id="numeroSiret">
              <Translate contentKey="theadpaieApp.employeur.numeroSiret">Numero Siret</Translate>
            </span>
          </dt>
          <dd>{employeurEntity.numeroSiret}</dd>
          <dt>
            <span id="numApe">
              <Translate contentKey="theadpaieApp.employeur.numApe">Num Ape</Translate>
            </span>
          </dt>
          <dd>{employeurEntity.numApe}</dd>
          <dt>
            <span id="numUrssaf">
              <Translate contentKey="theadpaieApp.employeur.numUrssaf">Num Urssaf</Translate>
            </span>
          </dt>
          <dd>{employeurEntity.numUrssaf}</dd>
          <dt>
            <Translate contentKey="theadpaieApp.employeur.conventionCollective">Convention Collective</Translate>
          </dt>
          <dd>
            {employeurEntity.conventionCollectives
              ? employeurEntity.conventionCollectives.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.id}</a>
                    {employeurEntity.conventionCollectives && i === employeurEntity.conventionCollectives.length - 1 ? '' : ', '}
                  </span>
                ))
              : null}
          </dd>
        </dl>
        <Button tag={Link} to="/employeur" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/employeur/${employeurEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default EmployeurDetail;
