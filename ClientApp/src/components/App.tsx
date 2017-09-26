import * as React from "react";
import Header from "./Header";
import { Body } from "./Body";
import { Footer } from "./Footer";


export default class App extends React.Component {
  render() {
    return (
      <main>
        <Header />
        <Body />
        <Footer />
      </main>
    );
  }
}
