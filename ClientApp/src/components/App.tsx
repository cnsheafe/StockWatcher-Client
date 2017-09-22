import * as React from "react";
import Header from "./Header";
import { Body } from "./Body";
import {connect} from "react-redux";
import store, {IState} from "../store/store";
import { toggleModalDisplay } from "../store/actions";

interface AppProps {
  showModal: boolean
}


export default class App extends React.Component<AppProps, {}> {
  render() {
    return (
      <main>
        <Header />
        <Body />
      </main>
    );
  }
}
