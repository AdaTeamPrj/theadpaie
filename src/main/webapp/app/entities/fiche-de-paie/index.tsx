import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import FicheDePaie from './fiche-de-paie';
import FicheDePaieDetail from './fiche-de-paie-detail';
import FicheDePaieUpdate from './fiche-de-paie-update';
import FicheDePaieDeleteDialog from './fiche-de-paie-delete-dialog';

const FicheDePaieRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<FicheDePaie />} />
    <Route path="new" element={<FicheDePaieUpdate />} />
    <Route path=":id">
      <Route index element={<FicheDePaieDetail />} />
      <Route path="edit" element={<FicheDePaieUpdate />} />
      <Route path="delete" element={<FicheDePaieDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default FicheDePaieRoutes;
