import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import Employeur from './employeur';
import EmployeurDetail from './employeur-detail';
import EmployeurUpdate from './employeur-update';
import EmployeurDeleteDialog from './employeur-delete-dialog';

const EmployeurRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<Employeur />} />
    <Route path="new" element={<EmployeurUpdate />} />
    <Route path=":id">
      <Route index element={<EmployeurDetail />} />
      <Route path="edit" element={<EmployeurUpdate />} />
      <Route path="delete" element={<EmployeurDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default EmployeurRoutes;
