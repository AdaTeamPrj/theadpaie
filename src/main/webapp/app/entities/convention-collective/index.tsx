import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import ConventionCollective from './convention-collective';
import ConventionCollectiveDetail from './convention-collective-detail';
import ConventionCollectiveUpdate from './convention-collective-update';
import ConventionCollectiveDeleteDialog from './convention-collective-delete-dialog';

const ConventionCollectiveRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<ConventionCollective />} />
    <Route path="new" element={<ConventionCollectiveUpdate />} />
    <Route path=":id">
      <Route index element={<ConventionCollectiveDetail />} />
      <Route path="edit" element={<ConventionCollectiveUpdate />} />
      <Route path="delete" element={<ConventionCollectiveDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default ConventionCollectiveRoutes;
