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
import { IEmployeur } from 'app/shared/model/employeur.model';
import { getEntities as getEmployeurs } from 'app/entities/employeur/employeur.reducer';
import { ITauxDImposition } from 'app/shared/model/taux-d-imposition.model';
import { getEntities as getTauxDImpositions } from 'app/entities/taux-d-imposition/taux-d-imposition.reducer';
import { ICotisation } from 'app/shared/model/cotisation.model';
import { getEntities as getCotisations } from 'app/entities/cotisation/cotisation.reducer';
import { IMention } from 'app/shared/model/mention.model';
import { getEntities as getMentions } from 'app/entities/mention/mention.reducer';
import { IFicheDePaie } from 'app/shared/model/fiche-de-paie.model';
import { getEntity, updateEntity, createEntity, reset } from './fiche-de-paie.reducer';

export const FicheDePaieUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const contrats = useAppSelector(state => state.contrat.entities);
  const employeurs = useAppSelector(state => state.employeur.entities);
  const tauxDImpositions = useAppSelector(state => state.tauxDImposition.entities);
  const cotisations = useAppSelector(state => state.cotisation.entities);
  const mentions = useAppSelector(state => state.mention.entities);
  const ficheDePaieEntity = useAppSelector(state => state.ficheDePaie.entity);
  const loading = useAppSelector(state => state.ficheDePaie.loading);
  const updating = useAppSelector(state => state.ficheDePaie.updating);
  const updateSuccess = useAppSelector(state => state.ficheDePaie.updateSuccess);

  const handleClose = () => {
    navigate('/fiche-de-paie');
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getContrats({}));
    dispatch(getEmployeurs({}));
    dispatch(getTauxDImpositions({}));
    dispatch(getCotisations({}));
    dispatch(getMentions({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    const entity = {
      ...ficheDePaieEntity,
      ...values,
      cotisations: mapIdList(values.cotisations),
      mentions: mapIdList(values.mentions),
      contrat: contrats.find(it => it.id.toString() === values.contrat.toString()),
      employeur: employeurs.find(it => it.id.toString() === values.employeur.toString()),
      imposition: tauxDImpositions.find(it => it.id.toString() === values.imposition.toString()),
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
          ...ficheDePaieEntity,
          contrat: ficheDePaieEntity?.contrat?.id,
          employeur: ficheDePaieEntity?.employeur?.id,
          imposition: ficheDePaieEntity?.imposition?.id,
          cotisations: ficheDePaieEntity?.cotisations?.map(e => e.id.toString()),
          mentions: ficheDePaieEntity?.mentions?.map(e => e.id.toString()),
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="theadpaieApp.ficheDePaie.home.createOrEditLabel" data-cy="FicheDePaieCreateUpdateHeading">
            <Translate contentKey="theadpaieApp.ficheDePaie.home.createOrEditLabel">Create or edit a FicheDePaie</Translate>
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
                  id="fiche-de-paie-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('theadpaieApp.ficheDePaie.salaireBrut')}
                id="fiche-de-paie-salaireBrut"
                name="salaireBrut"
                data-cy="salaireBrut"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                  validate: v => isNumber(v) || translate('entity.validation.number'),
                }}
              />
              <ValidatedField
                label={translate('theadpaieApp.ficheDePaie.startDate')}
                id="fiche-de-paie-startDate"
                name="startDate"
                data-cy="startDate"
                type="date"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                }}
              />
              <ValidatedField
                label={translate('theadpaieApp.ficheDePaie.endDate')}
                id="fiche-de-paie-endDate"
                name="endDate"
                data-cy="endDate"
                type="date"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                }}
              />
              <ValidatedField
                label={translate('theadpaieApp.ficheDePaie.datepaiement')}
                id="fiche-de-paie-datepaiement"
                name="datepaiement"
                data-cy="datepaiement"
                type="date"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                }}
              />
              <ValidatedField
                label={translate('theadpaieApp.ficheDePaie.salaireNet')}
                id="fiche-de-paie-salaireNet"
                name="salaireNet"
                data-cy="salaireNet"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                  validate: v => isNumber(v) || translate('entity.validation.number'),
                }}
              />
              <ValidatedField
                label={translate('theadpaieApp.ficheDePaie.montantNetAvantImpots')}
                id="fiche-de-paie-montantNetAvantImpots"
                name="montantNetAvantImpots"
                data-cy="montantNetAvantImpots"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                  validate: v => isNumber(v) || translate('entity.validation.number'),
                }}
              />
              <ValidatedField
                label={translate('theadpaieApp.ficheDePaie.proFees')}
                id="fiche-de-paie-proFees"
                name="proFees"
                data-cy="proFees"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                  validate: v => isNumber(v) || translate('entity.validation.number'),
                }}
              />
              <ValidatedField
                label={translate('theadpaieApp.ficheDePaie.deductions')}
                id="fiche-de-paie-deductions"
                name="deductions"
                data-cy="deductions"
                type="text"
              />
              <ValidatedField
                id="fiche-de-paie-contrat"
                name="contrat"
                data-cy="contrat"
                label={translate('theadpaieApp.ficheDePaie.contrat')}
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
              <ValidatedField
                id="fiche-de-paie-employeur"
                name="employeur"
                data-cy="employeur"
                label={translate('theadpaieApp.ficheDePaie.employeur')}
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
                id="fiche-de-paie-imposition"
                name="imposition"
                data-cy="imposition"
                label={translate('theadpaieApp.ficheDePaie.imposition')}
                type="select"
              >
                <option value="" key="0" />
                {tauxDImpositions
                  ? tauxDImpositions.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <ValidatedField
                label={translate('theadpaieApp.ficheDePaie.cotisation')}
                id="fiche-de-paie-cotisation"
                data-cy="cotisation"
                type="select"
                multiple
                name="cotisations"
              >
                <option value="" key="0" />
                {cotisations
                  ? cotisations.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <ValidatedField
                label={translate('theadpaieApp.ficheDePaie.mention')}
                id="fiche-de-paie-mention"
                data-cy="mention"
                type="select"
                multiple
                name="mentions"
              >
                <option value="" key="0" />
                {mentions
                  ? mentions.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/fiche-de-paie" replace color="info">
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

export default FicheDePaieUpdate;
