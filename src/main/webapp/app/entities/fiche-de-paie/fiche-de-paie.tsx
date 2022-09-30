import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IFicheDePaie } from 'app/shared/model/fiche-de-paie.model';
import { getEntities } from './fiche-de-paie.reducer';

export const FicheDePaie = () => {
  const dispatch = useAppDispatch();

  const location = useLocation();
  const navigate = useNavigate();

  const ficheDePaieList = useAppSelector(state => state.ficheDePaie.entities);
  const loading = useAppSelector(state => state.ficheDePaie.loading);

  useEffect(() => {
    dispatch(getEntities({}));
  }, []);

  const handleSyncList = () => {
    dispatch(getEntities({}));
  };

  return (
    <div>
      <h2 id="fiche-de-paie-heading" data-cy="FicheDePaieHeading">
        <Translate contentKey="theadpaieApp.ficheDePaie.home.title">Fiche De Paies</Translate>
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="theadpaieApp.ficheDePaie.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to="/fiche-de-paie/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="theadpaieApp.ficheDePaie.home.createLabel">Create new Fiche De Paie</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {ficheDePaieList && ficheDePaieList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="theadpaieApp.ficheDePaie.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="theadpaieApp.ficheDePaie.salaireBrut">Salaire Brut</Translate>
                </th>
                <th>
                  <Translate contentKey="theadpaieApp.ficheDePaie.startDate">Start Date</Translate>
                </th>
                <th>
                  <Translate contentKey="theadpaieApp.ficheDePaie.endDate">End Date</Translate>
                </th>
                <th>
                  <Translate contentKey="theadpaieApp.ficheDePaie.datepaiement">Datepaiement</Translate>
                </th>
                <th>
                  <Translate contentKey="theadpaieApp.ficheDePaie.salaireNet">Salaire Net</Translate>
                </th>
                <th>
                  <Translate contentKey="theadpaieApp.ficheDePaie.montantNetAvantImpots">Montant Net Avant Impots</Translate>
                </th>
                <th>
                  <Translate contentKey="theadpaieApp.ficheDePaie.proFees">Pro Fees</Translate>
                </th>
                <th>
                  <Translate contentKey="theadpaieApp.ficheDePaie.deductions">Deductions</Translate>
                </th>
                <th>
                  <Translate contentKey="theadpaieApp.ficheDePaie.contrat">Contrat</Translate>
                </th>
                <th>
                  <Translate contentKey="theadpaieApp.ficheDePaie.employeur">Employeur</Translate>
                </th>
                <th>
                  <Translate contentKey="theadpaieApp.ficheDePaie.imposition">Imposition</Translate>
                </th>
                <th>
                  <Translate contentKey="theadpaieApp.ficheDePaie.cotisation">Cotisation</Translate>
                </th>
                <th>
                  <Translate contentKey="theadpaieApp.ficheDePaie.mention">Mention</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {ficheDePaieList.map((ficheDePaie, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`/fiche-de-paie/${ficheDePaie.id}`} color="link" size="sm">
                      {ficheDePaie.id}
                    </Button>
                  </td>
                  <td>{ficheDePaie.salaireBrut}</td>
                  <td>
                    {ficheDePaie.startDate ? <TextFormat type="date" value={ficheDePaie.startDate} format={APP_LOCAL_DATE_FORMAT} /> : null}
                  </td>
                  <td>
                    {ficheDePaie.endDate ? <TextFormat type="date" value={ficheDePaie.endDate} format={APP_LOCAL_DATE_FORMAT} /> : null}
                  </td>
                  <td>
                    {ficheDePaie.datepaiement ? (
                      <TextFormat type="date" value={ficheDePaie.datepaiement} format={APP_LOCAL_DATE_FORMAT} />
                    ) : null}
                  </td>
                  <td>{ficheDePaie.salaireNet}</td>
                  <td>{ficheDePaie.montantNetAvantImpots}</td>
                  <td>{ficheDePaie.proFees}</td>
                  <td>{ficheDePaie.deductions}</td>
                  <td>{ficheDePaie.contrat ? <Link to={`/contrat/${ficheDePaie.contrat.id}`}>{ficheDePaie.contrat.id}</Link> : ''}</td>
                  <td>
                    {ficheDePaie.employeur ? <Link to={`/employeur/${ficheDePaie.employeur.id}`}>{ficheDePaie.employeur.id}</Link> : ''}
                  </td>
                  <td>
                    {ficheDePaie.imposition ? (
                      <Link to={`/taux-d-imposition/${ficheDePaie.imposition.id}`}>{ficheDePaie.imposition.id}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>
                    {ficheDePaie.cotisations
                      ? ficheDePaie.cotisations.map((val, j) => (
                          <span key={j}>
                            <Link to={`/cotisation/${val.id}`}>{val.id}</Link>
                            {j === ficheDePaie.cotisations.length - 1 ? '' : ', '}
                          </span>
                        ))
                      : null}
                  </td>
                  <td>
                    {ficheDePaie.mentions
                      ? ficheDePaie.mentions.map((val, j) => (
                          <span key={j}>
                            <Link to={`/mention/${val.id}`}>{val.id}</Link>
                            {j === ficheDePaie.mentions.length - 1 ? '' : ', '}
                          </span>
                        ))
                      : null}
                  </td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`/fiche-de-paie/${ficheDePaie.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`/fiche-de-paie/${ficheDePaie.id}/edit`} color="primary" size="sm" data-cy="entityEditButton">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`/fiche-de-paie/${ficheDePaie.id}/delete`}
                        color="danger"
                        size="sm"
                        data-cy="entityDeleteButton"
                      >
                        <FontAwesomeIcon icon="trash" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.delete">Delete</Translate>
                        </span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && (
            <div className="alert alert-warning">
              <Translate contentKey="theadpaieApp.ficheDePaie.home.notFound">No Fiche De Paies found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default FicheDePaie;
