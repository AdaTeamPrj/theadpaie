import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import TauxDImposition from './taux-d-imposition';
import TauxDImpositionDetail from './taux-d-imposition-detail';
import TauxDImpositionUpdate from './taux-d-imposition-update';
import TauxDImpositionDeleteDialog from './taux-d-imposition-delete-dialog';

const TauxDImpositionRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<TauxDImposition />} />
    <Route path="new" element={<TauxDImpositionUpdate />} />
    <Route path=":id">
      <Route index element={<TauxDImpositionDetail />} />
      <Route path="edit" element={<TauxDImpositionUpdate />} />
      <Route path="delete" element={<TauxDImpositionDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default TauxDImpositionRoutes;
