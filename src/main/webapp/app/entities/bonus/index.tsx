import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import Bonus from './bonus';
import BonusDetail from './bonus-detail';
import BonusUpdate from './bonus-update';
import BonusDeleteDialog from './bonus-delete-dialog';

const BonusRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<Bonus />} />
    <Route path="new" element={<BonusUpdate />} />
    <Route path=":id">
      <Route index element={<BonusDetail />} />
      <Route path="edit" element={<BonusUpdate />} />
      <Route path="delete" element={<BonusDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default BonusRoutes;
