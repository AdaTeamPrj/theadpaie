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
import { ILocation } from 'app/shared/model/location.model';
import { getEntities as getLocations } from 'app/entities/location/location.reducer';
import { IEmployeur } from 'app/shared/model/employeur.model';
import { getEntity, updateEntity, createEntity, reset } from './employeur.reducer';

export const EmployeurUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const conventionCollectives = useAppSelector(state => state.conventionCollective.entities);
  const locations = useAppSelector(state => state.location.entities);
  const employeurEntity = useAppSelector(state => state.employeur.entity);
  const loading = useAppSelector(state => state.employeur.loading);
  const updating = useAppSelector(state => state.employeur.updating);
  const updateSuccess = useAppSelector(state => state.employeur.updateSuccess);

  const handleClose = () => {
    navigate('/employeur');
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getConventionCollectives({}));
    dispatch(getLocations({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    const entity = {
      ...employeurEntity,
      ...values,
      conventionCollectives: mapIdList(values.conventionCollectives),
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
          ...employeurEntity,
          conventionCollectives: employeurEntity?.conventionCollectives?.map(e => e.id.toString()),
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="theadpaieApp.employeur.home.createOrEditLabel" data-cy="EmployeurCreateUpdateHeading">
            <Translate contentKey="theadpaieApp.employeur.home.createOrEditLabel">Create or edit a Employeur</Translate>
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
                  id="employeur-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('theadpaieApp.employeur.name')}
                id="employeur-name"
                name="name"
                data-cy="name"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                }}
              />
              <ValidatedField
                label={translate('theadpaieApp.employeur.numeroSiret')}
                id="employeur-numeroSiret"
                name="numeroSiret"
                data-cy="numeroSiret"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                  minLength: { value: 14, message: translate('entity.validation.minlength', { min: 14 }) },
                  maxLength: { value: 14, message: translate('entity.validation.maxlength', { max: 14 }) },
                }}
              />
              <ValidatedField
                label={translate('theadpaieApp.employeur.numApe')}
                id="employeur-numApe"
                name="numApe"
                data-cy="numApe"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                  minLength: { value: 5, message: translate('entity.validation.minlength', { min: 5 }) },
                  maxLength: { value: 5, message: translate('entity.validation.maxlength', { max: 5 }) },
                }}
              />
              <ValidatedField
                label={translate('theadpaieApp.employeur.numUrssaf')}
                id="employeur-numUrssaf"
                name="numUrssaf"
                data-cy="numUrssaf"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                  minLength: { value: 14, message: translate('entity.validation.minlength', { min: 14 }) },
                  maxLength: { value: 14, message: translate('entity.validation.maxlength', { max: 14 }) },
                }}
              />
              <ValidatedField
                label={translate('theadpaieApp.employeur.conventionCollective')}
                id="employeur-conventionCollective"
                data-cy="conventionCollective"
                type="select"
                multiple
                name="conventionCollectives"
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
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/employeur" replace color="info">
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

export default EmployeurUpdate;
