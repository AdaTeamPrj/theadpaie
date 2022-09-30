import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IConge } from 'app/shared/model/conge.model';
import { getEntities } from './conge.reducer';

export const Conge = () => {
  const dispatch = useAppDispatch();

  const location = useLocation();
  const navigate = useNavigate();

  const congeList = useAppSelector(state => state.conge.entities);
  const loading = useAppSelector(state => state.conge.loading);

  useEffect(() => {
    dispatch(getEntities({}));
  }, []);

  const handleSyncList = () => {
    dispatch(getEntities({}));
  };

  return (
    <div>
      <h2 id="conge-heading" data-cy="CongeHeading">
        <Translate contentKey="theadpaieApp.conge.home.title">Conges</Translate>
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="theadpaieApp.conge.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to="/conge/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="theadpaieApp.conge.home.createLabel">Create new Conge</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {congeList && congeList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="theadpaieApp.conge.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="theadpaieApp.conge.holdateStart">Holdate Start</Translate>
                </th>
                <th>
                  <Translate contentKey="theadpaieApp.conge.holdateEnd">Holdate End</Translate>
                </th>
                <th>
                  <Translate contentKey="theadpaieApp.conge.holdatePay">Holdate Pay</Translate>
                </th>
                <th>
                  <Translate contentKey="theadpaieApp.conge.nbCongeAcquis">Nb Conge Acquis</Translate>
                </th>
                <th>
                  <Translate contentKey="theadpaieApp.conge.nbCongePris">Nb Conge Pris</Translate>
                </th>
                <th>
                  <Translate contentKey="theadpaieApp.conge.dateDemande">Date Demande</Translate>
                </th>
                <th>
                  <Translate contentKey="theadpaieApp.conge.decision">Decision</Translate>
                </th>
                <th>
                  <Translate contentKey="theadpaieApp.conge.dateReponse">Date Reponse</Translate>
                </th>
                <th>
                  <Translate contentKey="theadpaieApp.conge.contrat">Contrat</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {congeList.map((conge, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`/conge/${conge.id}`} color="link" size="sm">
                      {conge.id}
                    </Button>
                  </td>
                  <td>
                    {conge.holdateStart ? <TextFormat type="date" value={conge.holdateStart} format={APP_LOCAL_DATE_FORMAT} /> : null}
                  </td>
                  <td>{conge.holdateEnd ? <TextFormat type="date" value={conge.holdateEnd} format={APP_LOCAL_DATE_FORMAT} /> : null}</td>
                  <td>{conge.holdatePay}</td>
                  <td>{conge.nbCongeAcquis}</td>
                  <td>{conge.nbCongePris}</td>
                  <td>{conge.dateDemande ? <TextFormat type="date" value={conge.dateDemande} format={APP_LOCAL_DATE_FORMAT} /> : null}</td>
                  <td>
                    <Translate contentKey={`theadpaieApp.Decision.${conge.decision}`} />
                  </td>
                  <td>{conge.dateReponse ? <TextFormat type="date" value={conge.dateReponse} format={APP_LOCAL_DATE_FORMAT} /> : null}</td>
                  <td>{conge.contrat ? <Link to={`/contrat/${conge.contrat.id}`}>{conge.contrat.id}</Link> : ''}</td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`/conge/${conge.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`/conge/${conge.id}/edit`} color="primary" size="sm" data-cy="entityEditButton">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`/conge/${conge.id}/delete`} color="danger" size="sm" data-cy="entityDeleteButton">
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
              <Translate contentKey="theadpaieApp.conge.home.notFound">No Conges found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Conge;
