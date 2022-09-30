import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IEmployeur } from 'app/shared/model/employeur.model';
import { getEntities } from './employeur.reducer';

export const Employeur = () => {
  const dispatch = useAppDispatch();

  const location = useLocation();
  const navigate = useNavigate();

  const employeurList = useAppSelector(state => state.employeur.entities);
  const loading = useAppSelector(state => state.employeur.loading);

  useEffect(() => {
    dispatch(getEntities({}));
  }, []);

  const handleSyncList = () => {
    dispatch(getEntities({}));
  };

  return (
    <div>
      <h2 id="employeur-heading" data-cy="EmployeurHeading">
        <Translate contentKey="theadpaieApp.employeur.home.title">Employeurs</Translate>
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="theadpaieApp.employeur.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to="/employeur/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="theadpaieApp.employeur.home.createLabel">Create new Employeur</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {employeurList && employeurList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="theadpaieApp.employeur.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="theadpaieApp.employeur.name">Name</Translate>
                </th>
                <th>
                  <Translate contentKey="theadpaieApp.employeur.numeroSiret">Numero Siret</Translate>
                </th>
                <th>
                  <Translate contentKey="theadpaieApp.employeur.numApe">Num Ape</Translate>
                </th>
                <th>
                  <Translate contentKey="theadpaieApp.employeur.numUrssaf">Num Urssaf</Translate>
                </th>
                <th>
                  <Translate contentKey="theadpaieApp.employeur.conventionCollective">Convention Collective</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {employeurList.map((employeur, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`/employeur/${employeur.id}`} color="link" size="sm">
                      {employeur.id}
                    </Button>
                  </td>
                  <td>{employeur.name}</td>
                  <td>{employeur.numeroSiret}</td>
                  <td>{employeur.numApe}</td>
                  <td>{employeur.numUrssaf}</td>
                  <td>
                    {employeur.conventionCollectives
                      ? employeur.conventionCollectives.map((val, j) => (
                          <span key={j}>
                            <Link to={`/convention-collective/${val.id}`}>{val.id}</Link>
                            {j === employeur.conventionCollectives.length - 1 ? '' : ', '}
                          </span>
                        ))
                      : null}
                  </td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`/employeur/${employeur.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`/employeur/${employeur.id}/edit`} color="primary" size="sm" data-cy="entityEditButton">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`/employeur/${employeur.id}/delete`} color="danger" size="sm" data-cy="entityDeleteButton">
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
              <Translate contentKey="theadpaieApp.employeur.home.notFound">No Employeurs found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Employeur;
