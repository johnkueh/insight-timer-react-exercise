import { CSSReset, ThemeProvider } from "@chakra-ui/core";
import React from "react";
import { BrowserRouter as Router, Redirect, Route } from "react-router-dom";
import Album from "./pages/Album";
import theme from "./theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CSSReset />
      <Router>
        <Redirect from="/" to="/albums/1" />
        <Route path="/albums/:albumId" component={Album} />
      </Router>
    </ThemeProvider>
  );
}

export default App;
