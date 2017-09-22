import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { BrowserRouter, Route, Switch, StaticRouter } from "react-router-dom";
import { BootFuncParams } from "aspnet-prerendering";

import App from "./components/App";

import store from "./store/store";


export function Index(isForServer: boolean, params?: BootFuncParams): JSX.Element {
  let index: JSX.Element;

  if (isForServer) {

    const baseUrl = params.baseUrl.substring(0, params.baseUrl.length - 1);

    index = (
      <Provider store={store}>
        <StaticRouter basename={baseUrl} context={{}} location={params.url}>
          <Switch>
            <Route exact path="/" component={App} />
          </Switch>
        </StaticRouter>
      </Provider>
    );
  }

  else {
    index = (
      <Provider store={store}>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={App} />
          </Switch>
        </BrowserRouter>
      </Provider>
    );
  }

  return index;
}