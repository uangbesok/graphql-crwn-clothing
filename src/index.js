import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { ApolloProvider, gql, ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { resolvers, typeDefs } from "./graphql/resolvers";
import * as serviceWorker from './serviceWorker';

import { store, persistor } from "./redux/store";

import "./index.css";
import App from "./App";

const link = new HttpLink({
  uri: "https://crwn-clothing.com",
});

const cache = new InMemoryCache();

const client = new ApolloClient({
  link,
  cache,
  typeDefs,
  resolvers,
});

client.writeQuery({
  query: gql`
    query {
      cartHidden,
      cartItems,
      itemCount,
    }
  `,
  data: {
    cartHidden: true,
    cartItems: [],
    itemCount: 0,
  },
});


ReactDOM.render(
  <ApolloProvider client={client}>
    <Provider store={store}>
      <BrowserRouter>
        <PersistGate persistor={persistor}>
          <App />
        </PersistGate>
      </BrowserRouter>
    </Provider>
  </ApolloProvider>,
  document.getElementById("root")
);

serviceWorker.register();
