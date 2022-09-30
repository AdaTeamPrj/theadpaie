import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './fiche-de-paie.reducer';

export const FicheDePaieDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const ficheDePaieEntity = useAppSelector(state => state.ficheDePaie.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="ficheDePaieDetailsHeading">
          <Translate contentKey="theadpaieApp.ficheDePaie.detail.title">FicheDePaie</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{ficheDePaieEntity.id}</dd>
          <dt>
            <span id="salaireBrut">
              <Translate contentKey="theadpaieApp.ficheDePaie.salaireBrut">Salaire Brut</Translate>
            </span>
          </dt>
          <dd>{ficheDePaieEntity.salaireBrut}</dd>
          <dt>
            <span id="startDate">
              <Translate contentKey="theadpaieApp.ficheDePaie.startDate">Start Date</Translate>
            </span>
          </dt>
          <dd>
            {ficheDePaieEntity.startDate ? (
              <TextFormat value={ficheDePaieEntity.startDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="endDate">
              <Translate contentKey="theadpaieApp.ficheDePaie.endDate">End Date</Translate>
            </span>
          </dt>
          <dd>
            {ficheDePaieEntity.endDate ? <TextFormat value={ficheDePaieEntity.endDate} type="date" format={APP_LOCAL_DATE_FORMAT} /> : null}
          </dd>
          <dt>
            <span id="datepaiement">
              <Translate contentKey="theadpaieApp.ficheDePaie.datepaiement">Datepaiement</Translate>
            </span>
          </dt>
          <dd>
            {ficheDePaieEntity.datepaiement ? (
              <TextFormat value={ficheDePaieEntity.datepaiement} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="salaireNet">
              <Translate contentKey="theadpaieApp.ficheDePaie.salaireNet">Salaire Net</Translate>
            </span>
          </dt>
          <dd>{ficheDePaieEntity.salaireNet}</dd>
          <dt>
            <span id="montantNetAvantImpots">
              <Translate contentKey="theadpaieApp.ficheDePaie.montantNetAvantImpots">Montant Net Avant Impots</Translate>
            </span>
          </dt>
          <dd>{ficheDePaieEntity.montantNetAvantImpots}</dd>
          <dt>
            <span id="proFees">
              <Translate contentKey="theadpaieApp.ficheDePaie.proFees">Pro Fees</Translate>
            </span>
          </dt>
          <dd>{ficheDePaieEntity.proFees}</dd>
          <dt>
            <span id="deductions">
              <Translate contentKey="theadpaieApp.ficheDePaie.deductions">Deductions</Translate>
            </span>
          </dt>
          <dd>{ficheDePaieEntity.deductions}</dd>
          <dt>
            <Translate contentKey="theadpaieApp.ficheDePaie.contrat">Contrat</Translate>
          </dt>
          <dd>{ficheDePaieEntity.contrat ? ficheDePaieEntity.contrat.id : ''}</dd>
          <dt>
            <Translate contentKey="theadpaieApp.ficheDePaie.employeur">Employeur</Translate>
          </dt>
          <dd>{ficheDePaieEntity.employeur ? ficheDePaieEntity.employeur.id : ''}</dd>
          <dt>
            <Translate contentKey="theadpaieApp.ficheDePaie.imposition">Imposition</Translate>
          </dt>
          <dd>{ficheDePaieEntity.imposition ? ficheDePaieEntity.imposition.id : ''}</dd>
          <dt>
            <Translate contentKey="theadpaieApp.ficheDePaie.cotisation">Cotisation</Translate>
          </dt>
          <dd>
            {ficheDePaieEntity.cotisations
              ? ficheDePaieEntity.cotisations.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.id}</a>
                    {ficheDePaieEntity.cotisations && i === ficheDePaieEntity.cotisations.length - 1 ? '' : ', '}
                  </span>
                ))
              : null}
          </dd>
          <dt>
            <Translate contentKey="theadpaieApp.ficheDePaie.mention">Mention</Translate>
          </dt>
          <dd>
            {ficheDePaieEntity.mentions
              ? ficheDePaieEntity.mentions.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.id}</a>
                    {ficheDePaieEntity.mentions && i === ficheDePaieEntity.mentions.length - 1 ? '' : ', '}
                  </span>
                ))
              : null}
          </dd>
        </dl>
        <Button tag={Link} to="/fiche-de-paie" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/fiche-de-paie/${ficheDePaieEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default FicheDePaieDetail;
