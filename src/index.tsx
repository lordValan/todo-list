import React from "react";
import ReactDOM from "react-dom";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import CssBaseline from "@material-ui/core/CssBaseline";

import App from "./components/App/App";

const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: "http://localhost:3005/graphql?",
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <CssBaseline />
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
