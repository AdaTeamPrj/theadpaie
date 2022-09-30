import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IConventionCollective } from 'app/shared/model/convention-collective.model';
import { getEntities } from './convention-collective.reducer';

export const ConventionCollective = () => {
  const dispatch = useAppDispatch();

  const location = useLocation();
  const navigate = useNavigate();

  const conventionCollectiveList = useAppSelector(state => state.conventionCollective.entities);
  const loading = useAppSelector(state => state.conventionCollective.loading);

  useEffect(() => {
    dispatch(getEntities({}));
  }, []);

  const handleSyncList = () => {
    dispatch(getEntities({}));
  };

  return (
    <div>
      <h2 id="convention-collective-heading" data-cy="ConventionCollectiveHeading">
        <Translate contentKey="theadpaieApp.conventionCollective.home.title">Convention Collectives</Translate>
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="theadpaieApp.conventionCollective.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link
            to="/convention-collective/new"
            className="btn btn-primary jh-create-entity"
            id="jh-create-entity"
            data-cy="entityCreateButton"
          >
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="theadpaieApp.conventionCollective.home.createLabel">Create new Convention Collective</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {conventionCollectiveList && conventionCollectiveList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="theadpaieApp.conventionCollective.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="theadpaieApp.conventionCollective.idcc">Idcc</Translate>
                </th>
                <th>
                  <Translate contentKey="theadpaieApp.conventionCollective.nom">Nom</Translate>
                </th>
                <th>
                  <Translate contentKey="theadpaieApp.conventionCollective.position">Position</Translate>
                </th>
                <th>
                  <Translate contentKey="theadpaieApp.conventionCollective.coefficient">Coefficient</Translate>
                </th>
                <th>
                  <Translate contentKey="theadpaieApp.conventionCollective.valeurPoint">Valeur Point</Translate>
                </th>
                <th>
                  <Translate contentKey="theadpaieApp.conventionCollective.baseFixe">Base Fixe</Translate>
                </th>
                <th>
                  <Translate contentKey="theadpaieApp.conventionCollective.salaireMinimaux">Salaire Minimaux</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {conventionCollectiveList.map((conventionCollective, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`/convention-collective/${conventionCollective.id}`} color="link" size="sm">
                      {conventionCollective.id}
                    </Button>
                  </td>
                  <td>{conventionCollective.idcc}</td>
                  <td>{conventionCollective.nom}</td>
                  <td>{conventionCollective.position}</td>
                  <td>{conventionCollective.coefficient}</td>
                  <td>{conventionCollective.valeurPoint}</td>
                  <td>{conventionCollective.baseFixe}</td>
                  <td>{conventionCollective.salaireMinimaux}</td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button
                        tag={Link}
                        to={`/convention-collective/${conventionCollective.id}`}
                        color="info"
                        size="sm"
                        data-cy="entityDetailsButton"
                      >
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`/convention-collective/${conventionCollective.id}/edit`}
                        color="primary"
                        size="sm"
                        data-cy="entityEditButton"
                      >
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`/convention-collective/${conventionCollective.id}/delete`}
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
              <Translate contentKey="theadpaieApp.conventionCollective.home.notFound">No Convention Collectives found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default ConventionCollective;
