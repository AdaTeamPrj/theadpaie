import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, Translate, translate, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IConventionCollective } from 'app/shared/model/convention-collective.model';
import { getEntities as getConventionCollectives } from 'app/entities/convention-collective/convention-collective.reducer';
import { IEmployeur } from 'app/shared/model/employeur.model';
import { getEntities as getEmployeurs } from 'app/entities/employeur/employeur.reducer';
import { IEmployee } from 'app/shared/model/employee.model';
import { getEntities as getEmployees } from 'app/entities/employee/employee.reducer';
import { IContrat } from 'app/shared/model/contrat.model';
import { TypeForfait } from 'app/shared/model/enumerations/type-forfait.model';
import { getEntity, updateEntity, createEntity, reset } from './contrat.reducer';

export const ContratUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const conventionCollectives = useAppSelector(state => state.conventionCollective.entities);
  const employeurs = useAppSelector(state => state.employeur.entities);
  const employees = useAppSelector(state => state.employee.entities);
  const contratEntity = useAppSelector(state => state.contrat.entity);
  const loading = useAppSelector(state => state.contrat.loading);
  const updating = useAppSelector(state => state.contrat.updating);
  const updateSuccess = useAppSelector(state => state.contrat.updateSuccess);
  const typeForfaitValues = Object.keys(TypeForfait);

  const handleClose = () => {
    navigate('/contrat');
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getConventionCollectives({}));
    dispatch(getEmployeurs({}));
    dispatch(getEmployees({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    const entity = {
      ...contratEntity,
      ...values,
      conventionCollective: conventionCollectives.find(it => it.id.toString() === values.conventionCollective.toString()),
      employeur: employeurs.find(it => it.id.toString() === values.employeur.toString()),
      employee: employees.find(it => it.id.toString() === values.employee.toString()),
    };

    if (isNew) {
      dispatch(createEntity(entity));
    } else {
      dispatch(updateEntity(entity));
    }
  };

  const defaultValues = () =>
    isNew
      ? {}
      : {
          typeForfait: 'Jour',
          ...contratEntity,
          conventionCollective: contratEntity?.conventionCollective?.id,
          employeur: contratEntity?.employeur?.id,
          employee: contratEntity?.employee?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="theadpaieApp.contrat.home.createOrEditLabel" data-cy="ContratCreateUpdateHeading">
            <Translate contentKey="theadpaieApp.contrat.home.createOrEditLabel">Create or edit a Contrat</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ValidatedForm defaultValues={defaultValues()} onSubmit={saveEntity}>
              {!isNew ? (
                <ValidatedField
                  name="id"
                  required
                  readOnly
                  id="contrat-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('theadpaieApp.contrat.salaireBase')}
                id="contrat-salaireBase"
                name="salaireBase"
                data-cy="salaireBase"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                  validate: v => isNumber(v) || translate('entity.validation.number'),
                }}
              />
              <ValidatedField
                label={translate('theadpaieApp.contrat.emploi')}
                id="contrat-emploi"
                name="emploi"
                data-cy="emploi"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                }}
              />
              <ValidatedField
                label={translate('theadpaieApp.contrat.dateArrive')}
                id="contrat-dateArrive"
                name="dateArrive"
                data-cy="dateArrive"
                type="date"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                }}
              />
              <ValidatedField
                label={translate('theadpaieApp.contrat.classification')}
                id="contrat-classification"
                name="classification"
                data-cy="classification"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                  validate: v => isNumber(v) || translate('entity.validation.number'),
                }}
              />
              <ValidatedField
                label={translate('theadpaieApp.contrat.typeForfait')}
                id="contrat-typeForfait"
                name="typeForfait"
                data-cy="typeForfait"
                type="select"
              >
                {typeForfaitValues.map(typeForfait => (
                  <option value={typeForfait} key={typeForfait}>
                    {translate('theadpaieApp.TypeForfait.' + typeForfait)}
                  </option>
                ))}
              </ValidatedField>
              <ValidatedField
                label={translate('theadpaieApp.contrat.nbHeure')}
                id="contrat-nbHeure"
                name="nbHeure"
                data-cy="nbHeure"
                type="text"
              />
              <ValidatedField
                id="contrat-conventionCollective"
                name="conventionCollective"
                data-cy="conventionCollective"
                label={translate('theadpaieApp.contrat.conventionCollective')}
                type="select"
              >
                <option value="" key="0" />
                {conventionCollectives
                  ? conventionCollectives.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <ValidatedField
                id="contrat-employeur"
                name="employeur"
                data-cy="employeur"
                label={translate('theadpaieApp.contrat.employeur')}
                type="select"
              >
                <option value="" key="0" />
                {employeurs
                  ? employeurs.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <ValidatedField
                id="contrat-employee"
                name="employee"
                data-cy="employee"
                label={translate('theadpaieApp.contrat.employee')}
                type="select"
              >
                <option value="" key="0" />
                {employees
                  ? employees.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/contrat" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.back">Back</Translate>
                </span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" data-cy="entityCreateSaveButton" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp;
                <Translate contentKey="entity.action.save">Save</Translate>
              </Button>
            </ValidatedForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default ContratUpdate;
