import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { ICotisation } from 'app/shared/model/cotisation.model';
import { getEntities } from './cotisation.reducer';

export const Cotisation = () => {
  const dispatch = useAppDispatch();

  const location = useLocation();
  const navigate = useNavigate();

  const cotisationList = useAppSelector(state => state.cotisation.entities);
  const loading = useAppSelector(state => state.cotisation.loading);

  useEffect(() => {
    dispatch(getEntities({}));
  }, []);

  const handleSyncList = () => {
    dispatch(getEntities({}));
  };

  return (
    <div>
      <h2 id="cotisation-heading" data-cy="CotisationHeading">
        <Translate contentKey="theadpaieApp.cotisation.home.title">Cotisations</Translate>
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="theadpaieApp.cotisation.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to="/cotisation/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="theadpaieApp.cotisation.home.createLabel">Create new Cotisation</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {cotisationList && cotisationList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="theadpaieApp.cotisation.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="theadpaieApp.cotisation.name">Name</Translate>
                </th>
                <th>
                  <Translate contentKey="theadpaieApp.cotisation.famille">Famille</Translate>
                </th>
                <th>
                  <Translate contentKey="theadpaieApp.cotisation.taux">Taux</Translate>
                </th>
                <th>
                  <Translate contentKey="theadpaieApp.cotisation.startDate">Start Date</Translate>
                </th>
                <th>
                  <Translate contentKey="theadpaieApp.cotisation.endDate">End Date</Translate>
                </th>
                <th>
                  <Translate contentKey="theadpaieApp.cotisation.actuel">Actuel</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {cotisationList.map((cotisation, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`/cotisation/${cotisation.id}`} color="link" size="sm">
                      {cotisation.id}
                    </Button>
                  </td>
                  <td>{cotisation.name}</td>
                  <td>
                    <Translate contentKey={`theadpaieApp.Categorie.${cotisation.famille}`} />
                  </td>
                  <td>{cotisation.taux}</td>
                  <td>
                    {cotisation.startDate ? <TextFormat type="date" value={cotisation.startDate} format={APP_LOCAL_DATE_FORMAT} /> : null}
                  </td>
                  <td>
                    {cotisation.endDate ? <TextFormat type="date" value={cotisation.endDate} format={APP_LOCAL_DATE_FORMAT} /> : null}
                  </td>
                  <td>{cotisation.actuel ? 'true' : 'false'}</td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`/cotisation/${cotisation.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`/cotisation/${cotisation.id}/edit`} color="primary" size="sm" data-cy="entityEditButton">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`/cotisation/${cotisation.id}/delete`} color="danger" size="sm" data-cy="entityDeleteButton">
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
              <Translate contentKey="theadpaieApp.cotisation.home.notFound">No Cotisations found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Cotisation;
