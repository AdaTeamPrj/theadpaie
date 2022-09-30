import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './conge.reducer';

export const CongeDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const congeEntity = useAppSelector(state => state.conge.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="congeDetailsHeading">
          <Translate contentKey="theadpaieApp.conge.detail.title">Conge</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{congeEntity.id}</dd>
          <dt>
            <span id="holdateStart">
              <Translate contentKey="theadpaieApp.conge.holdateStart">Holdate Start</Translate>
            </span>
          </dt>
          <dd>
            {congeEntity.holdateStart ? <TextFormat value={congeEntity.holdateStart} type="date" format={APP_LOCAL_DATE_FORMAT} /> : null}
          </dd>
          <dt>
            <span id="holdateEnd">
              <Translate contentKey="theadpaieApp.conge.holdateEnd">Holdate End</Translate>
            </span>
          </dt>
          <dd>
            {congeEntity.holdateEnd ? <TextFormat value={congeEntity.holdateEnd} type="date" format={APP_LOCAL_DATE_FORMAT} /> : null}
          </dd>
          <dt>
            <span id="holdatePay">
              <Translate contentKey="theadpaieApp.conge.holdatePay">Holdate Pay</Translate>
            </span>
          </dt>
          <dd>{congeEntity.holdatePay}</dd>
          <dt>
            <span id="nbCongeAcquis">
              <Translate contentKey="theadpaieApp.conge.nbCongeAcquis">Nb Conge Acquis</Translate>
            </span>
          </dt>
          <dd>{congeEntity.nbCongeAcquis}</dd>
          <dt>
            <span id="nbCongePris">
              <Translate contentKey="theadpaieApp.conge.nbCongePris">Nb Conge Pris</Translate>
            </span>
          </dt>
          <dd>{congeEntity.nbCongePris}</dd>
          <dt>
            <span id="dateDemande">
              <Translate contentKey="theadpaieApp.conge.dateDemande">Date Demande</Translate>
            </span>
          </dt>
          <dd>
            {congeEntity.dateDemande ? <TextFormat value={congeEntity.dateDemande} type="date" format={APP_LOCAL_DATE_FORMAT} /> : null}
          </dd>
          <dt>
            <span id="decision">
              <Translate contentKey="theadpaieApp.conge.decision">Decision</Translate>
            </span>
          </dt>
          <dd>{congeEntity.decision}</dd>
          <dt>
            <span id="dateReponse">
              <Translate contentKey="theadpaieApp.conge.dateReponse">Date Reponse</Translate>
            </span>
          </dt>
          <dd>
            {congeEntity.dateReponse ? <TextFormat value={congeEntity.dateReponse} type="date" format={APP_LOCAL_DATE_FORMAT} /> : null}
          </dd>
          <dt>
            <Translate contentKey="theadpaieApp.conge.contrat">Contrat</Translate>
          </dt>
          <dd>{congeEntity.contrat ? congeEntity.contrat.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/conge" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/conge/${congeEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default CongeDetail;
