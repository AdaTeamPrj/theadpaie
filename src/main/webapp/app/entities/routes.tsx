import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import Location from './location';
import Employee from './employee';
import Employeur from './employeur';
import Job from './job';
import TauxDImposition from './taux-d-imposition';
import Mention from './mention';
import Conge from './conge';
import Bonus from './bonus';
import Contrat from './contrat';
import FicheDePaie from './fiche-de-paie';
import ConventionCollective from './convention-collective';
import Cotisation from './cotisation';
/* jhipster-needle-add-route-import - JHipster will add routes here */

export default () => {
  return (
    <div>
      <ErrorBoundaryRoutes>
        {/* prettier-ignore */}
        <Route path="location/*" element={<Location />} />
        <Route path="employee/*" element={<Employee />} />
        <Route path="employeur/*" element={<Employeur />} />
        <Route path="job/*" element={<Job />} />
        <Route path="taux-d-imposition/*" element={<TauxDImposition />} />
        <Route path="mention/*" element={<Mention />} />
        <Route path="conge/*" element={<Conge />} />
        <Route path="bonus/*" element={<Bonus />} />
        <Route path="contrat/*" element={<Contrat />} />
        <Route path="fiche-de-paie/*" element={<FicheDePaie />} />
        <Route path="convention-collective/*" element={<ConventionCollective />} />
        <Route path="cotisation/*" element={<Cotisation />} />
        {/* jhipster-needle-add-route-path - JHipster will add routes here */}
      </ErrorBoundaryRoutes>
    </div>
  );
};
