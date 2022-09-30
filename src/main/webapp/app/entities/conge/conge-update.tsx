import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, Translate, translate, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IContrat } from 'app/shared/model/contrat.model';
import { getEntities as getContrats } from 'app/entities/contrat/contrat.reducer';
import { IConge } from 'app/shared/model/conge.model';
import { Decision } from 'app/shared/model/enumerations/decision.model';
import { getEntity, updateEntity, createEntity, reset } from './conge.reducer';

export const CongeUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const contrats = useAppSelector(state => state.contrat.entities);
  const congeEntity = useAppSelector(state => state.conge.entity);
  const loading = useAppSelector(state => state.conge.loading);
  const updating = useAppSelector(state => state.conge.updating);
  const updateSuccess = useAppSelector(state => state.conge.updateSuccess);
  const decisionValues = Object.keys(Decision);

  const handleClose = () => {
    navigate('/conge');
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getContrats({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    const entity = {
      ...congeEntity,
      ...values,
      contrat: contrats.find(it => it.id.toString() === values.contrat.toString()),
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
          decision: 'Accepte',
          ...congeEntity,
          contrat: congeEntity?.contrat?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="theadpaieApp.conge.home.createOrEditLabel" data-cy="CongeCreateUpdateHeading">
            <Translate contentKey="theadpaieApp.conge.home.createOrEditLabel">Create or edit a Conge</Translate>
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
                  id="conge-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('theadpaieApp.conge.holdateStart')}
                id="conge-holdateStart"
                name="holdateStart"
                data-cy="holdateStart"
                type="date"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                }}
              />
              <ValidatedField
                label={translate('theadpaieApp.conge.holdateEnd')}
                id="conge-holdateEnd"
                name="holdateEnd"
                data-cy="holdateEnd"
                type="date"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                }}
              />
              <ValidatedField
                label={translate('theadpaieApp.conge.holdatePay')}
                id="conge-holdatePay"
                name="holdatePay"
                data-cy="holdatePay"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                  validate: v => isNumber(v) || translate('entity.validation.number'),
                }}
              />
              <ValidatedField
                label={translate('theadpaieApp.conge.nbCongeAcquis')}
                id="conge-nbCongeAcquis"
                name="nbCongeAcquis"
                data-cy="nbCongeAcquis"
                type="text"
              />
              <ValidatedField
                label={translate('theadpaieApp.conge.nbCongePris')}
                id="conge-nbCongePris"
                name="nbCongePris"
                data-cy="nbCongePris"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                  validate: v => isNumber(v) || translate('entity.validation.number'),
                }}
              />
              <ValidatedField
                label={translate('theadpaieApp.conge.dateDemande')}
                id="conge-dateDemande"
                name="dateDemande"
                data-cy="dateDemande"
                type="date"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                }}
              />
              <ValidatedField
                label={translate('theadpaieApp.conge.decision')}
                id="conge-decision"
                name="decision"
                data-cy="decision"
                type="select"
              >
                {decisionValues.map(decision => (
                  <option value={decision} key={decision}>
                    {translate('theadpaieApp.Decision.' + decision)}
                  </option>
                ))}
              </ValidatedField>
              <ValidatedField
                label={translate('theadpaieApp.conge.dateReponse')}
                id="conge-dateReponse"
                name="dateReponse"
                data-cy="dateReponse"
                type="date"
              />
              <ValidatedField
                id="conge-contrat"
                name="contrat"
                data-cy="contrat"
                label={translate('theadpaieApp.conge.contrat')}
                type="select"
              >
                <option value="" key="0" />
                {contrats
                  ? contrats.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/conge" replace color="info">
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

export default CongeUpdate;
