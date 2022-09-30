import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { ITauxDImposition } from 'app/shared/model/taux-d-imposition.model';
import { getEntities } from './taux-d-imposition.reducer';

export const TauxDImposition = () => {
  const dispatch = useAppDispatch();

  const location = useLocation();
  const navigate = useNavigate();

  const tauxDImpositionList = useAppSelector(state => state.tauxDImposition.entities);
  const loading = useAppSelector(state => state.tauxDImposition.loading);

  useEffect(() => {
    dispatch(getEntities({}));
  }, []);

  const handleSyncList = () => {
    dispatch(getEntities({}));
  };

  return (
    <div>
      <h2 id="taux-d-imposition-heading" data-cy="TauxDImpositionHeading">
        <Translate contentKey="theadpaieApp.tauxDImposition.home.title">Taux D Impositions</Translate>
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="theadpaieApp.tauxDImposition.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to="/taux-d-imposition/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="theadpaieApp.tauxDImposition.home.createLabel">Create new Taux D Imposition</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {tauxDImpositionList && tauxDImpositionList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="theadpaieApp.tauxDImposition.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="theadpaieApp.tauxDImposition.taux">Taux</Translate>
                </th>
                <th>
                  <Translate contentKey="theadpaieApp.tauxDImposition.minSalary">Min Salary</Translate>
                </th>
                <th>
                  <Translate contentKey="theadpaieApp.tauxDImposition.maxSalary">Max Salary</Translate>
                </th>
                <th>
                  <Translate contentKey="theadpaieApp.tauxDImposition.startDate">Start Date</Translate>
                </th>
                <th>
                  <Translate contentKey="theadpaieApp.tauxDImposition.endDate">End Date</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {tauxDImpositionList.map((tauxDImposition, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`/taux-d-imposition/${tauxDImposition.id}`} color="link" size="sm">
                      {tauxDImposition.id}
                    </Button>
                  </td>
                  <td>{tauxDImposition.taux}</td>
                  <td>{tauxDImposition.minSalary}</td>
                  <td>{tauxDImposition.maxSalary}</td>
                  <td>
                    {tauxDImposition.startDate ? (
                      <TextFormat type="date" value={tauxDImposition.startDate} format={APP_LOCAL_DATE_FORMAT} />
                    ) : null}
                  </td>
                  <td>
                    {tauxDImposition.endDate ? (
                      <TextFormat type="date" value={tauxDImposition.endDate} format={APP_LOCAL_DATE_FORMAT} />
                    ) : null}
                  </td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button
                        tag={Link}
                        to={`/taux-d-imposition/${tauxDImposition.id}`}
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
                        to={`/taux-d-imposition/${tauxDImposition.id}/edit`}
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
                        to={`/taux-d-imposition/${tauxDImposition.id}/delete`}
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
              <Translate contentKey="theadpaieApp.tauxDImposition.home.notFound">No Taux D Impositions found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default TauxDImposition;
