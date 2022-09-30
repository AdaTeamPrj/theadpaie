import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IBonus } from 'app/shared/model/bonus.model';
import { getEntities } from './bonus.reducer';

export const Bonus = () => {
  const dispatch = useAppDispatch();

  const location = useLocation();
  const navigate = useNavigate();

  const bonusList = useAppSelector(state => state.bonus.entities);
  const loading = useAppSelector(state => state.bonus.loading);

  useEffect(() => {
    dispatch(getEntities({}));
  }, []);

  const handleSyncList = () => {
    dispatch(getEntities({}));
  };

  return (
    <div>
      <h2 id="bonus-heading" data-cy="BonusHeading">
        <Translate contentKey="theadpaieApp.bonus.home.title">Bonuses</Translate>
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="theadpaieApp.bonus.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to="/bonus/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="theadpaieApp.bonus.home.createLabel">Create new Bonus</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {bonusList && bonusList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="theadpaieApp.bonus.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="theadpaieApp.bonus.nom">Nom</Translate>
                </th>
                <th>
                  <Translate contentKey="theadpaieApp.bonus.montant">Montant</Translate>
                </th>
                <th>
                  <Translate contentKey="theadpaieApp.bonus.contrat">Contrat</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {bonusList.map((bonus, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`/bonus/${bonus.id}`} color="link" size="sm">
                      {bonus.id}
                    </Button>
                  </td>
                  <td>{bonus.nom}</td>
                  <td>{bonus.montant}</td>
                  <td>{bonus.contrat ? <Link to={`/contrat/${bonus.contrat.id}`}>{bonus.contrat.id}</Link> : ''}</td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`/bonus/${bonus.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`/bonus/${bonus.id}/edit`} color="primary" size="sm" data-cy="entityEditButton">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`/bonus/${bonus.id}/delete`} color="danger" size="sm" data-cy="entityDeleteButton">
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
              <Translate contentKey="theadpaieApp.bonus.home.notFound">No Bonuses found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Bonus;
