import React from 'react';
import { gql, useQuery } from "@apollo/client";

import CollectionPage from "./collection.component";
import Spinner from "../../components/spinner/spinner.component";

const GET_COLLECTION_BY_TITLE = gql`
    query GetCollectionsByTitle($title: String!) {
        getCollectionsByTitle(title: $title) {
            id
            title
            items {
            id
            name
            price
            imageUrl
            }
        }
    }
`;

const CollectionContainer = ({match}) => {
    const title = match.params.collectionId;
    const {loading, error, data} = useQuery(GET_COLLECTION_BY_TITLE, {
        variables: { title },
    });

    if(error) console.log(error);
    if (loading) return <Spinner />;

    if(data)
    {
        return <CollectionPage collection={data.getCollectionsByTitle}/>
    }
    else return null;
    

}

export default CollectionContainer;