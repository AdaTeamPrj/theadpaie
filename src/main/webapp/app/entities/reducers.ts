import location from 'app/entities/location/location.reducer';
import employee from 'app/entities/employee/employee.reducer';
import employeur from 'app/entities/employeur/employeur.reducer';
import job from 'app/entities/job/job.reducer';
import tauxDImposition from 'app/entities/taux-d-imposition/taux-d-imposition.reducer';
import mention from 'app/entities/mention/mention.reducer';
import conge from 'app/entities/conge/conge.reducer';
import bonus from 'app/entities/bonus/bonus.reducer';
import contrat from 'app/entities/contrat/contrat.reducer';
import ficheDePaie from 'app/entities/fiche-de-paie/fiche-de-paie.reducer';
import conventionCollective from 'app/entities/convention-collective/convention-collective.reducer';
import cotisation from 'app/entities/cotisation/cotisation.reducer';
/* jhipster-needle-add-reducer-import - JHipster will add reducer here */

const entitiesReducers = {
  location,
  employee,
  employeur,
  job,
  tauxDImposition,
  mention,
  conge,
  bonus,
  contrat,
  ficheDePaie,
  conventionCollective,
  cotisation,
  /* jhipster-needle-add-reducer-combine - JHipster will add reducer here */
};

export default entitiesReducers;
