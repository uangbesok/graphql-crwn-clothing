import React from 'react';
import { gql, useQuery } from "@apollo/client";

import CollectionsOverview from "./collections-overview.component";
import Spinner from "../spinner/spinner.component";

const GET_COLLECTIONS = gql`
{
    collections {
        id
        title
        items {
          id  
          name
          price
          imageUrl
        }
      }
}`

const CollectionsOverviewContainer = () => {
    const { loading, error, data } = useQuery(GET_COLLECTIONS);
    if(error) console.log(error);
    if (loading) return <Spinner />;
    return <CollectionsOverview collections={data.collections} />     
}

export default CollectionsOverviewContainer;