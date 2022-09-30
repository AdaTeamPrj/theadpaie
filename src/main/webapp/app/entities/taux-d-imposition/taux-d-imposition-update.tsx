import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, Translate, translate, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { ITauxDImposition } from 'app/shared/model/taux-d-imposition.model';
import { getEntity, updateEntity, createEntity, reset } from './taux-d-imposition.reducer';

export const TauxDImpositionUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const tauxDImpositionEntity = useAppSelector(state => state.tauxDImposition.entity);
  const loading = useAppSelector(state => state.tauxDImposition.loading);
  const updating = useAppSelector(state => state.tauxDImposition.updating);
  const updateSuccess = useAppSelector(state => state.tauxDImposition.updateSuccess);

  const handleClose = () => {
    navigate('/taux-d-imposition');
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    const entity = {
      ...tauxDImpositionEntity,
      ...values,
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
          ...tauxDImpositionEntity,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="theadpaieApp.tauxDImposition.home.createOrEditLabel" data-cy="TauxDImpositionCreateUpdateHeading">
            <Translate contentKey="theadpaieApp.tauxDImposition.home.createOrEditLabel">Create or edit a TauxDImposition</Translate>
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
                  id="taux-d-imposition-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('theadpaieApp.tauxDImposition.taux')}
                id="taux-d-imposition-taux"
                name="taux"
                data-cy="taux"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                  validate: v => isNumber(v) || translate('entity.validation.number'),
                }}
              />
              <ValidatedField
                label={translate('theadpaieApp.tauxDImposition.minSalary')}
                id="taux-d-imposition-minSalary"
                name="minSalary"
                data-cy="minSalary"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                  validate: v => isNumber(v) || translate('entity.validation.number'),
                }}
              />
              <ValidatedField
                label={translate('theadpaieApp.tauxDImposition.maxSalary')}
                id="taux-d-imposition-maxSalary"
                name="maxSalary"
                data-cy="maxSalary"
                type="text"
              />
              <ValidatedField
                label={translate('theadpaieApp.tauxDImposition.startDate')}
                id="taux-d-imposition-startDate"
                name="startDate"
                data-cy="startDate"
                type="date"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                }}
              />
              <ValidatedField
                label={translate('theadpaieApp.tauxDImposition.endDate')}
                id="taux-d-imposition-endDate"
                name="endDate"
                data-cy="endDate"
                type="date"
              />
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/taux-d-imposition" replace color="info">
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

export default TauxDImpositionUpdate;
