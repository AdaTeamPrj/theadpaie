import React from 'react';
import { Translate } from 'react-jhipster';

import MenuItem from 'app/shared/layout/menus/menu-item';

const EntitiesMenu = () => {
  return (
    <>
      {/* prettier-ignore */}
      <MenuItem icon="asterisk" to="/location">
        <Translate contentKey="global.menu.entities.location" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/employee">
        <Translate contentKey="global.menu.entities.employee" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/employeur">
        <Translate contentKey="global.menu.entities.employeur" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/job">
        <Translate contentKey="global.menu.entities.job" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/taux-d-imposition">
        <Translate contentKey="global.menu.entities.tauxDImposition" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/mention">
        <Translate contentKey="global.menu.entities.mention" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/conge">
        <Translate contentKey="global.menu.entities.conge" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/bonus">
        <Translate contentKey="global.menu.entities.bonus" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/contrat">
        <Translate contentKey="global.menu.entities.contrat" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/fiche-de-paie">
        <Translate contentKey="global.menu.entities.ficheDePaie" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/convention-collective">
        <Translate contentKey="global.menu.entities.conventionCollective" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/cotisation">
        <Translate contentKey="global.menu.entities.cotisation" />
      </MenuItem>
      {/* jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here */}
    </>
  );
};

export default EntitiesMenu;
