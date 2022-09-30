import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import Contrat from './contrat';
import ContratDetail from './contrat-detail';
import ContratUpdate from './contrat-update';
import ContratDeleteDialog from './contrat-delete-dialog';

const ContratRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<Contrat />} />
    <Route path="new" element={<ContratUpdate />} />
    <Route path=":id">
      <Route index element={<ContratDetail />} />
      <Route path="edit" element={<ContratUpdate />} />
      <Route path="delete" element={<ContratDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default ContratRoutes;
