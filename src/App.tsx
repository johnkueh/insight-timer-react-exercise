import { CSSReset, ThemeProvider } from "@chakra-ui/core";
import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Album from "./pages/Album";
import theme from "./theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CSSReset />
      <BrowserRouter>
        <Switch>
          <Redirect exact from="/" to="/albums/1" />
          <Route path="/albums/:albumId" component={Album} />
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
