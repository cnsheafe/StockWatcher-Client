import * as React from "react";
import Header from "./Header";
import { Body } from "./Body";


export default class App extends React.Component<{}, {}> {
  render() {
    return (
      <main>
        <Header />
        <Body />
      </main>
    );
  }
}
