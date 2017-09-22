import * as React from "react";

import Search from "./Search";
import Graphs from "./Graphs";
import Modal from "./Modal";


export class Body extends React.Component {
  render() {
    return(
      <section>
        <Search />
        <Graphs />
        <Modal />
      </section>
    );
  }
}