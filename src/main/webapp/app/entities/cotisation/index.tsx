import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import Cotisation from './cotisation';
import CotisationDetail from './cotisation-detail';
import CotisationUpdate from './cotisation-update';
import CotisationDeleteDialog from './cotisation-delete-dialog';

const CotisationRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<Cotisation />} />
    <Route path="new" element={<CotisationUpdate />} />
    <Route path=":id">
      <Route index element={<CotisationDetail />} />
      <Route path="edit" element={<CotisationUpdate />} />
      <Route path="delete" element={<CotisationDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default CotisationRoutes;
