import React, { lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import Spinner from "../../components/spinner/spinner.component";

const CollectionsOverviewContainer = lazy(() => import('../../components/collections-overview/collections-overview.container'));
const CollectionPageContainer = lazy(() => import('../collection/collection.container'));


const ShopPage = ({ match }) => {
  return (
    <div className='shop-page'>
      <Suspense fallback={<Spinner />}>
        <Switch>
          <Route exact path={`${match.path}`} component={CollectionsOverviewContainer} />
          <Route path={`${match.path}/:collectionId`} component={CollectionPageContainer} />
        </Switch>
      </Suspense>
    </div>)
};

export default ShopPage;
