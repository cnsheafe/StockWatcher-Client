import * as React from "react";
import * as ReactDOM from "react-dom";
import "react-hot-loader/patch";
import { AppContainer } from "react-hot-loader";
import * as RootContainer from "./src/Index";

let index = RootContainer.Index(false);

function renderApp() {
  // This code starts up the React app when it runs in a browser. It sets up the routing configuration
  // and injects the app into a DOM element.
  ReactDOM.render(
    <AppContainer>
      {index}
    </AppContainer>,
    document.getElementById('react-app')
  );
}

renderApp();

// Allow Hot Module Replacement
if (module.hot) {
  module.hot.accept("./src/Index", () => {
    let index = require<typeof RootContainer>("./src/Index").Index(false);
    renderApp();
  });
}

