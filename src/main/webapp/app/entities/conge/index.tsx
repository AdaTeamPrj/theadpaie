import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import Conge from './conge';
import CongeDetail from './conge-detail';
import CongeUpdate from './conge-update';
import CongeDeleteDialog from './conge-delete-dialog';

const CongeRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<Conge />} />
    <Route path="new" element={<CongeUpdate />} />
    <Route path=":id">
      <Route index element={<CongeDetail />} />
      <Route path="edit" element={<CongeUpdate />} />
      <Route path="delete" element={<CongeDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default CongeRoutes;
